package caps.testing.service;

import caps.testing.domain.Member;
import caps.testing.domain.Team;
import caps.testing.dto.member.ManagerSignUpDto;
import caps.testing.dto.member.MemberModifyDto;
import caps.testing.dto.member.MemberSignInRequestDto;
import caps.testing.dto.member.MemberSignUpRequestDto;
import caps.testing.exception.MemberException;
import caps.testing.exception.MemberExceptionType;
import caps.testing.jwt.JwtTokenProvider;
import caps.testing.repository.MemberRepository;
import caps.testing.service.chat.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.*;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import static java.util.List.of;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final TeamService teamService;
    private final RoomService roomService;

    @Transactional
    public Long join_worker(MemberSignUpRequestDto memberSignUpRequestDto) throws MemberException {
        validateDuplicateMember(memberSignUpRequestDto);
        String authentication_code = memberSignUpRequestDto.getAuthentication_code();

        HashSet<String> allCode = memberRepository.findAllCode();

        if(!allCode.contains(authentication_code)){
            log.info("찾지 못함");
            throw new IllegalStateException("코드를 다시 확인해주세요");
        }

        Member manager = memberRepository.findAllByCodeLike(authentication_code).get(0);
        Member member = memberRepository.save(memberSignUpRequestDto.toMember());
        member.setTeam(manager.getTeam());
        member.setTeam_name(manager.getTeam_name());
        member.setTeam_address(manager.getTeam_address());
        member.encodePassword(passwordEncoder);

        return member.getId();
    }

    @Transactional
    public Long join_manager(ManagerSignUpDto managerSignUpDto) throws Exception {
        validateDuplicateManager(managerSignUpDto);

        String team_name = managerSignUpDto.getTeam_name();

        String team_address = managerSignUpDto.getTeam_address();
        String url = makeUrl(team_address);
        List<Double> location = fetchData(url);

        Team setTeam = Team.builder()
                .name(team_name)
                .address(team_address)
                .latitude(location.get(0))
                .longitude(location.get(1))
                .build();
        Team registered = teamService.register(setTeam);

        roomService.create(registered.getId().intValue());

        Member member = memberRepository.save(managerSignUpDto.toManager());

        member.setTeam(registered);
        member.encodePassword(passwordEncoder);
        member.encodeAuthentication(passwordEncoder);
        return member.getId();
    }

    public Member register(Member member){
        Member setMember = memberRepository.save(member);
        return setMember;
    }

    @Transactional
    public String login(MemberSignInRequestDto requestDto) {
        Member member = memberRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_SIGNUP_EMAIL));
        validateMatchedPassword(requestDto.getPwd(), member.getPwd());

        //TODO : Access Token 과 Refresh Token 을 생성합니다.
        String accessToken = jwtTokenProvider.createAccessToken(member.getEmail(), member.getAdmin().name());
        String refreshToken = jwtTokenProvider.createRefreshToken();

        //TODO : Refresh Token 을 DB에 저장합니다.
        member.updateRefreshToken(refreshToken);
        memberRepository.save(member);

//        return TokenResponseDto.builder()
//                .accessToken(accessToken)
//                .refreshToken(refreshToken)
//                .build();
        return accessToken;
    }

    @Transactional
    public Member login2(MemberSignInRequestDto requestDto) {
        Member member = memberRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_SIGNUP_EMAIL));
        validateMatchedPassword(requestDto.getPwd(), member.getPwd());

        return member;
    }

    @Transactional
    public Member findMyInfo(Long id){
        Member myInfo = memberRepository.findMemberById(id);
        return myInfo;
    }

    public Long findMyId(Member member){
        return member.getId();
    }

    public List<Member> findAllMyTeam(Long id){
        return memberRepository.findAllMyTeam(id);
    }

    public Long findMyTeamId(Long id){
        return memberRepository.findMyTeamId(id);
    }

    public void validateDuplicateMember(MemberSignUpRequestDto memberSignUpRequestDto){
        Optional<Member> findMembers = memberRepository.findByEmail(memberSignUpRequestDto.getEmail());
        if(!findMembers.isEmpty()){
            throw new IllegalStateException("이미 가입한 회원입니다.");
        }
    }

    public void validateDuplicateManager(ManagerSignUpDto managerSignUpDto) {
        Optional<Member> findMembers = memberRepository.findByEmail(managerSignUpDto.getEmail());
        if (!findMembers.isEmpty()) {
            throw new IllegalStateException("이미 가입한 회원입니다.");
        }
    }

    public List<Member> findMembers(){
        return memberRepository.findAll();
    }

    private void validateMatchedPassword(String validPassword, String memberPassword){
        if(!passwordEncoder.matches(validPassword, memberPassword)){
            throw new MemberException(MemberExceptionType.WRONG_PASSWORD);
        }
    }

    private boolean matchedAuthentication(String validCode, String memberCode){
        if(validCode.equals(memberCode)){
            return true;
        }
        return false;
    }

    // url api 생성
    private static String makeUrl(String address) throws UnsupportedEncodingException {

        List<String> listKey = new ArrayList<>();
        List<String> listVal = new ArrayList<>();

        listKey = List.of("service", "request", "crs", "address", "format", "type", "key");
        listVal = List.of("address", "getcoord", "epsg:4326", address, "json", "road", "4ED1B9F5-6695-304D-A340-88024AE1D96C");

        String baseUrl = "http://api.vworld.kr/req/address?";
        String tmp = "";

        for (int i = 0; i < listKey.size(); i++) {
            tmp += URLEncoder.encode(listKey.get(i), "UTF-8");
            tmp += "=";
            tmp += URLEncoder.encode(listVal.get(i), "UTF-8");
            tmp += "&";
        }

        String resultUrl = baseUrl + tmp;
        String url = resultUrl.substring(0, resultUrl.length() - 1);

        return url;
    }

    // api를 기반으로 위도, 경도 찾기
    private static List<Double> fetchData(String input) throws Exception{
        URL url = new URL(input);
        URLConnection connection = url.openConnection();
        StringBuilder sb = new StringBuilder();

        try(BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()))){
            String line = in.readLine();
            sb.append(line);

            JSONParser parser =  new JSONParser();

            JSONObject jsonObject = (JSONObject) parser.parse(line);
            Object response = jsonObject.get("response");

            JSONObject jsonObject1 = (JSONObject) parser.parse(response.toString());
            Object result = jsonObject1.get("result");

            JSONObject jsonObject2 = (JSONObject) parser.parse(result.toString());
            Object point = jsonObject2.get("point");

            JSONObject jsonObject3 = (JSONObject) parser.parse(point.toString());
            Object x = jsonObject3.get("x");
            Object y = jsonObject3.get("y");

            String x1 = x.toString();
            String y1 = y.toString();

            double latitude = Double.valueOf(x1).doubleValue();
            double longitude = Double.valueOf(y1).doubleValue();

            List<Double> location = of(latitude, longitude);
            return location;
        }
    }

    @Transactional
    public void modifyMember(MemberModifyDto modifyRequestDto, Long id) {
        String rawPwd = modifyRequestDto.getPwd();
        String encodePwd = passwordEncoder.encode(rawPwd);
        memberRepository.updateMember(modifyRequestDto.getName(), modifyRequestDto.getEmail(), modifyRequestDto.getPhone(), encodePwd, id);
    }

    @Transactional
    public void deleteMember(Long id) {
        memberRepository.deleteMember(id);
    }
}
