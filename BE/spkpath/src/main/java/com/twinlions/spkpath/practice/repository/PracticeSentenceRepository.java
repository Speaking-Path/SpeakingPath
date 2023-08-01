package com.twinlions.spkpath.practice.repository;

import com.twinlions.spkpath.practice.entity.single.SentenceEntity;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface PracticeSentenceRepository extends Repository<SentenceEntity, String> {
    List<SentenceEntity> findAll();
}
