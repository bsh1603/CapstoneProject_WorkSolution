//package caps.testing;
//
//import caps.testing.domain.Administration;
//import caps.testing.domain.Member;
//import caps.testing.domain.Team;
//import caps.testing.dto.member.MemberDTO;
//import caps.testing.repository.MemberRepository;
//import caps.testing.repository.TeamRepository;
//import caps.testing.service.MemberService;
//import caps.testing.service.TeamService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import org.springframework.test.annotation.Rollback;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.persistence.EntityManager;
//
//import java.util.List;
//
//@Transactional
//@SpringBootTest
//class TestingApplicationTests {
//
//    @Autowired
//    EntityManager em;
//    @Autowired
//    MemberService memberService;
//    @Autowired
//    MemberRepository memberRepository;
//
//    @Autowired
//    TeamService teamService;
//    @Autowired
//    TeamRepository teamRepository;
//
//    @Test
//    @Rollback(value = false)
//    public void 회원가입() throws Exception{
//        //given
//        Member member = new Member();
//        member.setName("테스트8");
//        member.setEmail("gagaet@anaer.com");
//        member.setPwd("datdga");
////        member.setAdmin(Administration.MANAGER);
//        member.setPhone("01047523532");
//
////        Team team = new Team();
////        team.setName("팀2");
////        em.persist(team);
//
////        member.setTeam(team);
//        //when
//        MemberDTO memberDTO = new MemberDTO();
//        memberDTO.setName("dtotest3");
//        memberDTO.setEmail("dsatq@anaer.com");
//        memberDTO.setPwd("2417dags");
////        memberDTO.setAdmin(Administration.MANAGER);
//        memberDTO.setPhone("01038881111");
////        Long saveId = memberService.save(memberDTO);
//        //then
//
////        System.out.println(saveId);
//
//        List<Member> all = memberRepository.findAll();
//        for(Member m : all){
//            System.out.println(m.getName());
//        }
//    }
//
//    @Test
//    public void 전체조회() throws Exception{
//        //given
//        List<Member> all = memberRepository.findAll();
//        for(Member m : all){
//            System.out.println(m.getName());
//        }
//
//        //when
//
//        //then
//    }
//
//    @Test
//    @Rollback(value = false)
//    public void 팀넣기() throws Exception{
//        //given
//        Team team = new Team();
////        team.setName("팀1");
//
//        //when
////        Long saveId = teamService.register(team);
//
//        //then
////        assertEquals(team, teamRepository.findOne(saveId));
//    }
//
//    @Test
//    @Rollback(value = false)
//    public void 멤버팀조인() throws Exception{
//        Member member = new Member();
//        member.setName("테스트9");
//        member.setEmail("lkkkk@anaer.com");
//        member.setPwd("ahfahwerq");
//        member.setAdmin(Administration.ROLE_MANAGER);
//        member.setPhone("01047526482");
//
//        Team team;
////        team = teamService.findOne(2L);
////        member.setTeam(team);
//        //when
////        Long saveId = memberService.register(member);
//
//        //then
////        assertEquals(member, memberRepository.findOne(saveId));
//    }
//
//    @Test
//    public void 중복회원() throws Exception{
//        //given
//        Member member1 = new Member();
//        Member member2 = new Member();
//
//        member1.setName("일");
//        member1.setEmail("123@naver.com");
//        member1.setPwd("123");
//        member2.setName("이");
//        member2.setEmail("123@naver.com");
//        member2.setPwd("123");
//        //when
////        memberService.register(member1);
////        memberService.register(member2);
//
//        //then
//
//    }
//
//    @Test
//    public void 전체멤버조회() throws Exception{
//        //given
//        MemberDTO memberDTO = new MemberDTO();
//        memberDTO.setName("dtotest1");
//        memberDTO.setEmail("atthio@anaer.com");
//        memberDTO.setPwd("241750");
////        memberDTO.setAdmin(Administration.MANAGER);
//        memberDTO.setPhone("01045361111");
////        Long saveId = memberService.save(memberDTO);
//
//        MemberDTO memberDTO1 = new MemberDTO();
//        memberDTO.setName("adg");
//        memberDTO.setEmail("atsetat@anaer.com");
//        memberDTO.setPwd("dgahra");
////        memberDTO.setAdmin(Administration.WORKER);
//        memberDTO.setPhone("01045361111");
////        Long saveId1 = memberService.save(memberDTO1);
//        //when
//
//        List<Member> all = memberRepository.findAll();
//        for(Member m : all){
//            System.out.println(m.getName());
//        }
//        //then
//    }
//
//    @Test
//    public void 내팀아이디찾기() throws Exception{
//        //given
//        Long id = 2L;
//        Long myTeamId = memberService.findMyTeamId(id);
//        //when
//
//        System.out.println(myTeamId);
//        //then
//    }
//
//}
