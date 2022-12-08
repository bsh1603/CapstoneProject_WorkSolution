package caps.testing.service.chat;


import caps.testing.domain.chat.MessageEntity;
import caps.testing.domain.chat.RoomEntity;
import caps.testing.repository.chat.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public void create(RoomEntity roomEntity, String sender , String content){
        MessageEntity message =new MessageEntity();
        message.setSender(sender);
        message.setContent(content);
        message.setRoomEntity(roomEntity);
        this.messageRepository.save(message);


    }

}
