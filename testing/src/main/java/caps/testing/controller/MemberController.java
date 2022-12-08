package caps.testing.controller;

import caps.testing.domain.Member;
import caps.testing.dto.*;
import caps.testing.dto.member.ManagerSignUpDto;
import caps.testing.dto.member.MemberModifyDto;
import caps.testing.dto.member.MemberSignInRequestDto;
import caps.testing.dto.member.MemberSignUpRequestDto;
import caps.testing.repository.MemberRepository;
import caps.testing.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemberController {

    @Autowired
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    //알바생 회원가입 정보를 받아서 DB에 저장하는 API
    @PostMapping(value = "/api/signup/worker", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Long signUp_worker(@RequestBody @Valid MemberSignUpRequestDto memberSignUpRequestDto){
        return memberService.join_worker(memberSignUpRequestDto);
    }

    //매니저 회원가입 정보를 받아서 DB에 저장하는 API
    @PostMapping(value = "/api/signup/manager", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Long singUp_manger(@RequestBody @Valid ManagerSignUpDto managerSignUpDto) throws Exception{
        return memberService.join_manager(managerSignUpDto);
    }

    //알바생, 매니저 이메일과 비밀번호를 받아서 로그인하는 API
    @PostMapping(value = "/api/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Member login(@RequestBody @Valid MemberSignInRequestDto requestDto) {
        Member member = memberService.login2(requestDto);
        return member;
    }

    @GetMapping("/members")
    public List<Member> list(Model model){
        List<Member> members = memberService.findMembers();
        return members;
    }

    //멤버 ID 별 같은 팀에 속하는 모든 팀원들 조회
    @GetMapping("/api/member/{member_id}")
    public List<Member> getMemberByTeam(@PathVariable("member_id") Long member_id){
        Long myTeamId = memberService.findMyTeamId(member_id);
        List<Member> members = memberService.findAllMyTeam(myTeamId);
        return members;
    }

    @GetMapping("api/member/my/{member_id}")
    public Member getAllMemberInfo(@PathVariable("member_id") Long member_id){
        Member myInfo = memberService.findMyInfo(member_id);
        return myInfo;
    }

    //멤버 ID 별 개인 정보 수정하는 API
    @PostMapping(value = "/api/member/modify/{member_id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String memberModify(@RequestBody @Valid MemberModifyDto modifyRequestDto, @PathVariable("member_id") Long member_id){
        memberService.modifyMember(modifyRequestDto, member_id);
        return "수정 완료";
    }

////    @PostMapping("/api/member/{member_id}/delete")
////    public String memberDelete(@RequestBody @Valid DeleteRequestDto deleteRequestDto, @PathVariable("member_id") Long member_id){
////        memberService.deleteMember(deleteRequestDto, member_id);
////        return "삭제 완료";
//    }

    //멤버 ID 별 멤버 ID 외 모든 정보 null 값으로 삭제하는 API(매니저만 사용가능, 지점에서 방출 개념)
    @PostMapping(value = "/api/member/dump/{member_id}")
    public String memberDelete(@PathVariable("member_id") Long member_id){
        memberService.deleteMember(member_id);
        return "삭제 완료";
    }

    @GetMapping("/api/member/myteam/{member_id}")
    public Long getMyTeamId(@PathVariable("member_id") Long member_id){
        return memberService.findMyTeamId(member_id);
    }
}