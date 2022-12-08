package caps.testing.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.apache.tomcat.util.buf.Utf8Encoder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.codec.Utf8;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.beans.Encoder;
import java.net.PasswordAuthentication;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collection;
import java.util.List;

@Entity(name = "member")
@Data
@Getter @Setter
@NoArgsConstructor
public class Member implements UserDetails {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long id;

    @Column(name = "MEMBER_NAME")
    private String name;

    @Column(name = "MEMBER_EMAIL")
    private String email;

    @Column(name = "MEMBER_PWD")
    private String pwd;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEMBER_ADMIN")
    private Administration admin;

    @Column(name = "MEMBER_PHONE_NUMBER")
    private String phone;

    @Column(name = "AUTHENTICATION_CODE")
    private String authentication_code;

    private String refreshToken;

    @ManyToOne
    @JoinColumn(name = "TEAM_ID")
    @JsonBackReference
    private Team team;

    @JsonIgnore
    @Column(name = "TEAM_NAME")
    private String team_name;

    @JsonIgnore
    @Column(name = "TEAM_ADDRESS")
    private String team_address;

    @OneToMany(mappedBy = "member")
    @JsonManagedReference
    private List<Work> works = new ArrayList<>();

    @Builder
    public Member(Long id, String name, String email, String pwd, Administration admin, String phone, String authentication_code, String team_name, String team_address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.pwd = pwd;
        this.admin = admin;
        this.phone = phone;
        this.authentication_code = authentication_code;
        this.team_name = team_name;
        this.team_address = team_address;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> auth = new ArrayList<>();
        auth.add(new SimpleGrantedAuthority(admin.name()));
        return auth;
    }

    public void encodePassword(PasswordEncoder passwordEncoder){
        this.pwd = passwordEncoder.encode(pwd);
    }

    public void encodeAuthentication(PasswordEncoder passwordEncoder){
        this.authentication_code = passwordEncoder.encode(authentication_code);

    }

    @Override
    public String getPassword() {
        return pwd;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }
}
