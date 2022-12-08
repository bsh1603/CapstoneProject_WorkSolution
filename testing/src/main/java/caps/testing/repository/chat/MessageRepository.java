package caps.testing.repository.chat;


import caps.testing.domain.chat.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
public interface MessageRepository extends JpaRepository<MessageEntity,Integer> {

}
