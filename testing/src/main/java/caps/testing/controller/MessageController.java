package caps.testing.controller;



import caps.testing.domain.chat.MessageEntity;
import caps.testing.domain.chat.RoomEntity;
import caps.testing.dto.chat.MessagePacket;
import caps.testing.dto.chat.RoomPacket;
import caps.testing.service.chat.MessageService;
import caps.testing.service.chat.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@RestController
public class MessageController {
    private final RoomService roomService;
    private final MessageService messageService;


    @PostMapping("/api/room/{roomId}")
    public String createMessage(@RequestBody MessagePacket messagePacket){
        RoomEntity roomEntity = this.roomService.getRoom(messagePacket.getRoomId());
        //message 저장
        System.out.println(messagePacket.getSender().getClass());
        this.messageService.create(roomEntity,messagePacket.getSender() ,messagePacket.getContent());

        return "message communication success";
    }

    @PostMapping("/api/message/{roomId}")
    public List<MessagePacket> callMessage(@RequestBody RoomPacket roomPacket){
        //프론트엔드로 메세지 보내기 성공
        List<MessageEntity> mL = this.roomService.getAllMessage(roomPacket.getRoomId());
        //메세지 없으면 보내지 말자. (null인 경우)
        List<MessagePacket> mP = new ArrayList<MessagePacket>();

        //메세지 패킷으로 보내자.
        if(mL == null){
            return null;
        }else{
            //엔티티에 있는거 패킷에 다 집어넣기
            for(int i=0; i< mL.size() ; ++i){
                MessagePacket mp1 = new MessagePacket();
                mp1.setSender(mL.get(i).getSender());
                mp1.setContent(mL.get(i).getContent());

                mP.add(mp1);
            }

            return mP;
        }



    }
}
