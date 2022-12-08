package caps.testing.dto.member;

import caps.testing.domain.Administration;
import caps.testing.domain.Member;
import caps.testing.domain.Team;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ManagerSignUpDto {

    private String email;
    private String name;
    private String pwd;
    private Administration admin;
    private String phone;
    private String authentication_code;
    private String team_name;
    private String team_address;

    public Member toManager(){
        return Member.builder()
                .email(email)
                .name(name)
                .pwd(pwd)
                .admin(Administration.ROLE_MANAGER)
                .phone(phone)
                .authentication_code(authentication_code)
                .team_name(team_name)
                .team_address(team_address)
                .build();
    }
}
