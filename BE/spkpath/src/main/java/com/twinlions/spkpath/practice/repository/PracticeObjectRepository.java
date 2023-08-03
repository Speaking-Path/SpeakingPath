package com.twinlions.spkpath.practice.repository;

import com.twinlions.spkpath.practice.entity.single.ObjectEntity;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface PracticeObjectRepository extends Repository<ObjectEntity, String> {
    List<ObjectEntity> findAll();
    Optional<ObjectEntity> findByObjId(int objId);
}
