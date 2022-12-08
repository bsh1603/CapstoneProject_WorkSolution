package caps.testing.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Getter @Setter
public class User {

    int id;
    String username;
    String password;
}
