package caps.testing.dto.stock;

import caps.testing.domain.stock.Stock;
import lombok.*;

import java.sql.Timestamp;

@Data
@Getter
@Setter
@NoArgsConstructor
public class StockRegisterDto {
    private Timestamp date;
    private String name;
    private int price;
    private int quantity;

    @Builder
    public Stock toStock() {
        return Stock.builder()
                .name(name)
                .price(price)
                .quantity(quantity)
                .date(date)
                .build();
    }

}
