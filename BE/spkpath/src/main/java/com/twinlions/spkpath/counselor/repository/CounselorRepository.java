package com.twinlions.spkpath.counselor.repository;

import com.twinlions.spkpath.counselor.entity.Counselor;
import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface CounselorRepository extends Repository<Counselor, String> {
    Optional<Object> findByUserId(String userId);

    Optional<Object> findAll();
}
