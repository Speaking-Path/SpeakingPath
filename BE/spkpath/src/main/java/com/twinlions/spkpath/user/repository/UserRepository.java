package com.twinlions.spkpath.user.repository;

import com.twinlions.spkpath.user.UserDto;
import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.repository.Repository;


import java.util.List;
import java.util.Optional;

public interface UserRepository extends Repository<User, String> {

<<<<<<< Updated upstream
    Optional<User> findByUserEmail(String userEmail);
=======
    Optional<Object> findById(String userId);
    Optional<Object> findByUserEmail(String userEmail);

    User save(User user);
>>>>>>> Stashed changes
}
