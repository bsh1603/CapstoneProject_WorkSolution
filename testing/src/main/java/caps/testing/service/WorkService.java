package caps.testing.service;

import caps.testing.domain.Member;
import caps.testing.domain.Work;
import caps.testing.dto.work.WorkEndDto;
import caps.testing.dto.work.WorkStartDto;
import caps.testing.repository.MemberRepository;
import caps.testing.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class WorkService {

    private final WorkRepository workRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Long save_startTime(WorkStartDto workStartDto, Long id){
        Work startWork = workRepository.save(workStartDto.toStartWork());
        Optional<Member> findMember = memberRepository.findById(id);
        startWork.setMember(findMember.get());

        Long workId = startWork.getId();

        workRepository.updateWorkDayKorean(workStartDto.getWork_start_time(), workId);

        workRepository.findWorkDate(workId);

        return startWork.getId();
    }

    public Long find_null_id(){
        Long nullId = workRepository.findNullId();
        return nullId;
    }

    @Transactional
    public void save_endTime(WorkEndDto workEndDto, Long id){
        workRepository.updateEndTime(workEndDto.getWork_end_time(), id);
        calculate_work_time();
    }

    @Transactional
    public void calculate_work_time() {
        workRepository.today_work_time();
    }
}
