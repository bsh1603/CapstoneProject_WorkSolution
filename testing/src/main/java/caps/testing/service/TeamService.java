package caps.testing.service;

import caps.testing.domain.Member;
import caps.testing.domain.Team;
import caps.testing.dto.TeamDto;
import caps.testing.repository.MemberRepository;
import caps.testing.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class TeamService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;

    public Team register(Team team){
        Team saveTeam = teamRepository.save(team);
        return saveTeam;
    }

    public Map<String, Double> findLocation(Long id){
        Map<String, Double> map = new HashMap<>();
        Double latitudeByTeamId = memberRepository.findTeamLatitude(id);
        Double longitudeByTeamId = memberRepository.findTeamLongitude(id);

        map.put("latitude", latitudeByTeamId);
        map.put("longitude", longitudeByTeamId);

        return map;
    }
}
