package caps.testing.dto.stock;

import caps.testing.domain.stock.Stock;
import lombok.*;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockUpdateDto {

    private String name;
    private Timestamp date;
    private int price;
    private int quantity;

    public Stock toUpdate() {
        return Stock.builder()
                .name(name)
                .date(date)
                .price(price)
                .quantity(quantity)
                .build();
    }
}

