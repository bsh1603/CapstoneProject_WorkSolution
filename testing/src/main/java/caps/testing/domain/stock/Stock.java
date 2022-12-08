package caps.testing.domain.stock;

import caps.testing.domain.Team;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "stock")
@NoArgsConstructor
@Getter
@Setter
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STOCK_ID")
    private Long id;

    @OneToOne
    @JoinColumn(name = "TEAM_ID")
    @JsonBackReference
    private Team team;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH-mm", timezone = "Asia/Seoul")
    @CreatedDate
    @Column(name = "STOCK_DATE")
    private Timestamp date;

    @Column(name = "STOCK_NAME")
    private String name;

    @Column(name = "STOCK_PRICE")
    private int price;

    @Column(name = "STOCK_QUANTITY")
    private int quantity;

    @Builder
    public Stock(Long id, Team team, Timestamp date, String name, int price, int quantity) {
        this.id = id;
        this.team = team;
        this.date = date;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

//    //재고 수량 증가
//    public int increaseStockQuantity(int stockQuantity) {
//        return this.stockQuantity += stockQuantity;
//    }
//
//    //재고 수량 감소
//    public void decreaseStockQuantity(int quantity) {
//        int restStock = this.stockQuantity - quantity;
//        this.stockQuantity = restStock;
//    }
//
//    //재고 물품 수정
//    private void changeStock(String stockItem, int stockPrice, int stockQuantity) {
//        this.stockItem = stockItem;
//        this.stockPrice = stockPrice;
//        this.stockQuantity = stockQuantity;
//    }


