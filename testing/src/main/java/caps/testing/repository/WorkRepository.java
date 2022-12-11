package caps.testing.repository;

import caps.testing.domain.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {

    Optional<Work> findById(Long id);

    @Query(value = "select w.work_start_time from work w where w.id = ?1", nativeQuery = true)
    Timestamp findStartTime(Long id);

    @Query(value = "select w.work_start_time from work w where w.member_id = ?1", nativeQuery = true)
    List<Timestamp> findAllStartTime(Long id);

    @Query(value = "select w.work_date from work w where w.member_id = ?1", nativeQuery = true)
    List<String> findWorkDateForChart(Long id);

    @Query(value = "select w.work_time from work w where w.member_id = ?1", nativeQuery = true)
    List<Long> findWorkTimeForChart(Long id);

    @Query(value = "select w.work_date, w.work_time from work w where w.member_id = ?1", nativeQuery = true)
    Map<String, Long> findWorkData(Long id);

    @Query(value = "select w.work_end_time from work w where w.id =?1", nativeQuery = true)
    Timestamp findEndTime(Long id);

    @Query(value = "select w.work_id from work w where w.work_end_time is null", nativeQuery = true)
    Long findNullId();

    @Modifying
    @Query(value = "UPDATE work w set w.work_end_time = :localDateTime where w.member_id = :id and w.work_end_time is null", nativeQuery = true)
    void updateEndTime(@Param("localDateTime") Timestamp localDateTime, @Param("id") Long id);

    @Modifying
    @Query(value = "UPDATE work w set w.work_time = timestampdiff(minute, w.work_start_time, w.work_end_time)", nativeQuery = true)
    void today_work_time();

    @Modifying
    @Query(value = "Update work w set w.work_date = date_format(w.work_start_time, '%Y-%m-%d') where w.work_id = :work_id", nativeQuery = true)
    void findWorkDate(@Param("work_id") Long work_id);

    @Modifying
    @Query(value = "update work w set w.work_day_korean = (substr(\'일월화수목금토\', dayofweek(w.work_start_time), 1))", nativeQuery = true)
    void updateWorkDayKorean(@Param("work_start_time") Timestamp work_start_time, @Param("work_id") Long work_id);

    @Query(value = "select w.work_day_korean from work w where w.member_id = ?1", nativeQuery = true)
    List<String> findWorkDayKorean(Long id);
}
