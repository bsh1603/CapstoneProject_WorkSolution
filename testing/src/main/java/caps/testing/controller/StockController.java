package caps.testing.controller;

import caps.testing.domain.Member;
import caps.testing.domain.stock.Stock;
import caps.testing.dto.stock.StockRegisterDto;
import caps.testing.dto.stock.StockUpdateDto;
import caps.testing.repository.stock.StockRepository;
import caps.testing.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class StockController {

    @Autowired
    private final StockRepository stockRepository;
    private final StockService stockService;

    //팀 별 재고 등록하는 API
    @PostMapping(value = "/api/stock/{team_id}")
    public Long stock_register(@RequestBody @Valid StockRegisterDto stockRegisterDto, @PathVariable("team_id") Long team_id){
        return stockService.registerStock(stockRegisterDto, team_id);
    }

    //팀 별 재고 조회하는 API
    @GetMapping("/api/stock/{team_id}")
    public List<Stock> getStockByTeam(@PathVariable("team_id") Long team_id){
        List<Stock> stock = stockService.findAllStock(team_id);
        return stock;
    }

    //팀 별 재고 수정하는 API
    @PostMapping(value = "/api/stock/update/{team_id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String stock_update(@RequestBody @Valid StockUpdateDto stockUpdateDto, @PathVariable("team_id") Long team_id){
        stockService.updateStock(stockUpdateDto, team_id);
        return "수정 완료";
    }

    //팀 별 재고 삭제하는 API
    @PostMapping(value = "/api/stock/delete/{stock_id}")
    public String stock_delete(@PathVariable("stock_id") Long stock_id){
        stockService.deleteStock(stock_id);
        return "삭제 완료";
    }
}
