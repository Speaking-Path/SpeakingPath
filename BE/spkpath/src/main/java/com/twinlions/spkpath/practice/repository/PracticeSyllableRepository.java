package com.twinlions.spkpath.practice.repository;


import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface PracticeSyllableRepository extends Repository<SyllableEntity, String> {
    List<SyllableEntity> findAll();
}
