package caps.testing.dto.chat;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomPacket {
    String sender;
    Integer roomId;
}
