package caps.testing.repository;

import caps.testing.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Map;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

//    Optional<Team> findByName(String name);

//    @Query(name = "select T.team_latitude from team T where T.team_id = ?1", nativeQuery = true)
//    Double findLatitudeByTeamId(Long team_id);

//    @Query(name = "select t.team_longitude from team t where t.team_id = ?1", nativeQuery = true)
//    Long findLongitudeByTeamId(Long team_id);

    @Query(value = "select * from team t where t.team_id = :team_id", nativeQuery = true)
    Team findMyTeam(@Param("team_id") Long team_id);
}
