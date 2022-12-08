package caps.testing.dto;

import caps.testing.domain.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamDto {

    private String name;
    private String address;
    private double latitude;
    private double longitude;

    public Team toTeam(){
        return Team.builder()
                .name(name)
                .address(address)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
}
