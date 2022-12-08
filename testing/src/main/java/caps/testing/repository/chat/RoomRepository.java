package caps.testing.repository.chat;


import caps.testing.domain.chat.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<RoomEntity,Integer> {


    Optional<RoomEntity> findByRoomname(Integer roomname);

    //RoomEntity findByRoomname(Integer Roomname);
}
