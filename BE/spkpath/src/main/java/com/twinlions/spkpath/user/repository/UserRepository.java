package com.twinlions.spkpath.user.repository;

import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UserRepository extends Repository<User, String> {
//    Optional<Object> findById(String userId);
    Optional<User> findByUserId(String userId);
    Optional<Object> findByUserEmail(String userEmail);
    User save(User user);
}