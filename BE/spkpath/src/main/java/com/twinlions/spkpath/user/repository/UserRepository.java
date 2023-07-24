package com.twinlions.spkpath.user.repository;

import com.twinlions.spkpath.counselor.entity.Counselor;
import com.twinlions.spkpath.user.UserDto;
import com.twinlions.spkpath.user.entity.User;
import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.data.repository.Repository;


import java.util.List;
import java.util.Optional;

public interface UserRepository extends Repository<User, String> {

    Optional<User> findByUserEmail(String userEmail);
    Optional<Object> findById(String userId);

    User save(User user);

    Counselor save(Counselor counselor);
}
