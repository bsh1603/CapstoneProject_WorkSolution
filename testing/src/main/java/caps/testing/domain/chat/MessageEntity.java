package caps.testing.domain.chat;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@Entity
public class MessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column
    private String sender;


    @Column
    private String content;


    @ManyToOne
    private RoomEntity roomEntity;

}
