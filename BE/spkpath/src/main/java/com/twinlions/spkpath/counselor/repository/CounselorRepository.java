package com.twinlions.spkpath.counselor.repository;

import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CounselorRepository extends JpaRepository<User, String>  {
    Optional<Object> findByUserId(String userId);
}
