package com.twinlions.spkpath.user.repository;

import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<Object> findByUserEmail(String userEmail);
    Optional<Object> findAllByUserGrade(String userGrade);
}
