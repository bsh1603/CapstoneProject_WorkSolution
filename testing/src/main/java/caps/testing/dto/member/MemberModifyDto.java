package caps.testing.dto.member;

import caps.testing.domain.Member;
import lombok.*;

import caps.testing.domain.Administration;
import caps.testing.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberModifyDto {

    private String name;
    private String email;
    private String pwd;
    private String phone;

    public Member toModify() {
        return Member.builder()
                .email(email)
                .name(name)
                .pwd(pwd)
                .phone(phone)
                .build();
    }
}


