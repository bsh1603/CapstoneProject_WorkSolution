package caps.testing.repository.stock;

import caps.testing.domain.Member;
import caps.testing.domain.stock.Stock;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.jmx.export.annotation.ManagedOperationParameter;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    Optional<Stock> findById(Long id);

    @Query(value = "select * from stock s where s.stock_id = ?1", nativeQuery = true)
    List<Stock> findAll(Long stock_id);

    @Query(value = "select * from stock s where s.team_id = ?1", nativeQuery = true)
    List<Stock> findAllMyTeam(Long team_id);

    @Modifying
    @Query(value = "UPDATE stock s " +
            "set s.stock_name = :name, s.stock_date = :date, s.stock_price = :price, s.stock_quantity = :quantity " +
            "where s.stock_id = :id", nativeQuery = true)
    void updateStock(@Param("name") String name, @Param("date") Timestamp date, @Param("price") int price,
                     @Param("quantity") int quantity, @Param("id") Long id);

    @Modifying
    @Query(value = "DELETE FROM stock s where s.stock_id = ?1", nativeQuery = true)
    void deleteStock(@Param("stock_id") Long stock_id);

}
