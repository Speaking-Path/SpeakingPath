package com.twinlions.spkpath.practice.repository;


import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface PracticeSyllableRepository extends Repository<SyllableEntity, String> {
    List<SyllableEntity> findAll();
    Optional<SyllableEntity> findBySlbId(int slbId);
    int count();
}
