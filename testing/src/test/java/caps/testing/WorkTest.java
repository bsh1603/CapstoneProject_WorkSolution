//package caps.testing;
//
//import caps.testing.domain.Administration;
//import caps.testing.domain.Member;
//import caps.testing.domain.Work;
//import caps.testing.dto.work.WorkEndDto;
//import caps.testing.dto.work.WorkStartDto;
//import caps.testing.repository.WorkRepository;
//import caps.testing.service.WorkService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.persistence.EntityManager;
//import java.sql.Timestamp;
//import java.text.DateFormat;
//import java.time.LocalDateTime;
//
//@Transactional
//@SpringBootTest
//public class WorkTest {
//
//    @Autowired
//    EntityManager em;
//
//    @Autowired
//    WorkRepository workRepository;
//
//    @Autowired
//    WorkService workService;
//
//    @Test
//    @Rollback(value = false)
//    public void 시작시간넣기() throws Exception{
//        //given
//        WorkStartDto workStartDto = new WorkStartDto();
////        workStartDto.setWork_start_time(LocalDateTime.now()); // 받았다
//
//        Long id = workService.save_startTime(workStartDto);
//        System.out.println(id);
//
//
//        //then
//    }
//
//    @Test
//    public void nullid찾기() throws Exception{
//        //given
//        Long null_id = workService.find_null_id();
//        System.out.println(null_id);
//
//        //then
//    }
//
//    @Test
//    @Rollback(value = false)
//    public void 끝나는시간넣기() throws Exception{
//        //given
//        Long null_id = workService.find_null_id();
//        WorkEndDto workEndDto = new WorkEndDto();
////        workEndDto.setWork_end_time(LocalDateTime.now());
//        //when
//
//        System.out.println("*********");
//        System.out.println(null_id);
//        System.out.println(workEndDto.getWork_end_time());
//
//        System.out.println("*************************");
//        workService.save_endTime(workEndDto);
//
//        //then
//    }
//
//    @Test
//    @Rollback(value = false)
//    public void 시간찾기() throws Exception{
//        //given
//        workService.calculate_work_time();
//        //when
//
//        //then
//    }
//}
