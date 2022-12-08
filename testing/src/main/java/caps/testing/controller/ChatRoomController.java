package caps.testing.controller;



import caps.testing.dto.chat.RoomPacket;
import caps.testing.service.chat.MessageService;
import caps.testing.service.chat.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class ChatRoomController {

    private final MessageService messageService;
    private final RoomService roomService;

    @PostMapping("/api/room")
    public String rooms(@RequestBody RoomPacket roomPacket){
        roomService.create(roomPacket.getRoomId());

        return roomPacket.getRoomId().toString();
    }
}
