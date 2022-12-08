package caps.testing.domain.chat;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@Entity
public class RoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column
    private Integer roomname;

    @Column
    private Integer teamnumber;

    @OneToMany(mappedBy = "roomEntity",cascade = CascadeType.REMOVE)
    private List<MessageEntity> messageEntityList;
}
