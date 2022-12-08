package caps.testing.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter @Setter
public class Address {

    @Column(name = "MEMBER_CITY")
    private String city;
    @Column(name = "MEMBER_STREET")
    private String street;

    protected Address(){

    }

    public Address(String city, String street) {
        this.city = city;
        this.street = street;
    }
}
