package com.twinlions.spkpath.consultant.repository;

import com.twinlions.spkpath.consultant.entity.Consultant;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface ConsultantRepository extends Repository<Consultant, String> {
    List<Consultant> findAll();
    Optional<Object> findByUserId(String userId);

    List<Consultant> findAll(Specification<Consultant> spec);

    Consultant save(Consultant consultant);
}

