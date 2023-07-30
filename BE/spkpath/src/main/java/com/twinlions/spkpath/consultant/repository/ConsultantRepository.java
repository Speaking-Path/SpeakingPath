package com.twinlions.spkpath.consultant.repository;

import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.consultant.entity.Consultant;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConsultantRepository extends Repository<Consultant, String> {
    Optional<Object> findAll();
    Optional<Object> findByUserId(String userId);

    List<Consultant> findAll(Specification<Consultant> example);

    Consultant save(Consultant consultant);
}

