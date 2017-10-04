package valentin.ershov.repository;

import org.springframework.data.repository.CrudRepository;
import valentin.ershov.entity.User;

/**
 * Created by Valek on 03.10.2017.
 */
public interface UserRepository extends CrudRepository<User, Long> {
}
