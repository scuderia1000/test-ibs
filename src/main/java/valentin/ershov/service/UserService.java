package valentin.ershov.service;

import valentin.ershov.entity.User;

import java.util.List;

/**
 * Created by Valek on 03.10.2017.
 */
public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    void deleteById(Long id);

    User getById(Long id);
}
