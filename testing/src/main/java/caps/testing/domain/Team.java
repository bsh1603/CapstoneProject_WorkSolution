package caps.testing.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.data.geo.Point;

import javax.persistence.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "team")
@NoArgsConstructor
@Getter @Setter
public class Team {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TEAM_ID")
    private Long id;

    @Column(name = "TEAM_NAME")
    private String name;

    @Column(name = "TEAM_ADDRESS")
    private String address;

    @Column(name = "TEAM_LATITUDE")
    private double latitude;

    @Column(name = "TEAM_LONGITUDE")
    private double longitude;

    @OneToMany(mappedBy = "team")
    @JsonManagedReference
    private List<Member> memberList = new ArrayList<>();

    @Builder
    public Team(Long id, String name, String address, double latitude, double longitude){
        this.id = id;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
