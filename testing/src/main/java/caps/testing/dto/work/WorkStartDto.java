package caps.testing.dto.work;

import caps.testing.domain.Work;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkStartDto {

    private Timestamp work_start_time;

    public Work toStartWork(){
        return Work.builder()
                .work_start_time(work_start_time)
                .build();
    }
}
