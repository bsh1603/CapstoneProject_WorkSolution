package caps.testing.service.chat;



import caps.testing.DataNotFoundException;
import caps.testing.domain.chat.MessageEntity;
import caps.testing.domain.chat.RoomEntity;
import caps.testing.repository.chat.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RoomService {

    @Autowired
    private final RoomRepository roomRepository;

    public void create(Integer roomId){
        Optional<RoomEntity> roomEntity = this.roomRepository.findByRoomname(roomId);
        if(roomEntity.isPresent()){
            return;
        }else{

        }


        RoomEntity r1 = new RoomEntity();
        r1.setRoomname(roomId);
        this.roomRepository.save(r1);

    }

    public RoomEntity getRoom(Integer id){
        Optional<RoomEntity> roomEntity = this.roomRepository.findByRoomname(id);
        if(roomEntity.isPresent()){
            return roomEntity.get();
        }else{
            throw new DataNotFoundException("Room not found");
        }


    }

    public List<MessageEntity> getAllMessage(Integer roomid){
        Optional<RoomEntity> roomEntity = this.roomRepository.findByRoomname(roomid);

        List<MessageEntity> messageList = null;
        if(roomEntity.isPresent()){
            RoomEntity r1 = roomEntity.get();
            messageList = r1.getMessageEntityList();

        }

        return messageList;
    }
}
