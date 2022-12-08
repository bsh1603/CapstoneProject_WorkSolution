package caps.testing.service;


import caps.testing.domain.Member;
import caps.testing.domain.Team;
import caps.testing.domain.stock.Stock;
import caps.testing.dto.stock.StockRegisterDto;
import caps.testing.dto.stock.StockUpdateDto;
import caps.testing.repository.MemberRepository;
import caps.testing.repository.TeamRepository;
import caps.testing.repository.stock.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class StockService {

    private final StockRepository stockRepository;
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;

    //재고 등록
    @Transactional
    public Long registerStock(StockRegisterDto stockRegisterDto, Long id){

        Stock stock = stockRegisterDto.toStock();
        Stock result = stockRepository.save(stock);

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm");
        String currTime = simpleDateFormat.format(timestamp);
        stock.setDate(timestamp);

        Team myTeam = teamRepository.findMyTeam(id);
        result.setTeam(myTeam);

        return result.getId();
    }

    //재고 조회
    @Transactional
    public List<Stock> findAllStock(Long id) {
        return stockRepository.findAllMyTeam(id);
    }

    //재고 수정
    @Transactional
    public void updateStock(StockUpdateDto stockupdateDto, Long id) {
        stockRepository.updateStock(stockupdateDto.getDate(), stockupdateDto.getPrice(), stockupdateDto.getQuantity(), id);
    }

    //재고 삭제
    @Transactional
    public void deleteStock(Long id) {
        stockRepository.deleteStock(id);
    }
}
