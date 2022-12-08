package caps.testing.dto.stock;

import caps.testing.domain.Member;
import caps.testing.domain.stock.Stock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockDeleteDto {

    private String name;
    private Timestamp date;
    private int price;
    private int quantity;

    public Stock toDelete() {
        return Stock.builder()
                .name(name)
                .date(date)
                .price(price)
                .quantity(quantity)
                .build();
    }

}

