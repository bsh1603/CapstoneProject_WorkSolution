package caps.testing.dto.work;

import caps.testing.domain.Work;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkEndDto {

    private Timestamp work_end_time;

    @Builder
    public Work toEndWork(){
        return Work.builder()
                .work_end_time(work_end_time)
                .build();
    }
}
