//package caps.testing;
//
//import caps.testing.domain.Member;
//import caps.testing.domain.chat.Message;
//import caps.testing.dto.chat.MessageDto;
//import caps.testing.dto.chat.RoomDto;
//import caps.testing.repository.MemberRepository;
//import caps.testing.service.chat.MessageService;
//import caps.testing.service.chat.RoomService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.Optional;
//
//@Transactional
//@SpringBootTest
//public class ChatTest {
//
//    @Autowired
//    RoomService roomService;
//
//    @Autowired
//    MessageService messageService;
//
//    @Autowired
//    MemberRepository memberRepository;
//
//    @Test
//    @Rollback(value = false)
//    public void 채팅방만들기() throws Exception{
//        //given
//        Long myTeamId = memberRepository.findMyTeamId(1L);
//        String name = "채팅방1";
//        RoomDto roomDto = new RoomDto();
//        roomDto.setName(name);
//
//        Long whatId = roomService.create_room(roomDto, myTeamId);
//        System.out.println(whatId);
//
//        //then
//    }
//
//    @Test
////    @Rollback(value = false)
//    public void testMember() throws Exception{
//        //given
//        String content = "안녕";
//        MessageDto messageDto = new MessageDto();
//        messageDto.setContent(content);
//
//        //when
//
//        //then
//    }
//}
