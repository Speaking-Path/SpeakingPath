package com.twinlions.spkpath.consultant.repository;

import com.twinlions.spkpath.consultant.entity.Consultant;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface ConsultantRepository extends Repository<Consultant, String> {
    Optional<Object> findByUserId(String userId);

    Optional<Object> findAll();
}
