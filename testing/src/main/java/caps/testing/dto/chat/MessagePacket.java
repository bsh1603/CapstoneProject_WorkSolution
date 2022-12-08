package caps.testing.dto.chat;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessagePacket {
    Integer roomId;
    String sender;
    String content;
}
