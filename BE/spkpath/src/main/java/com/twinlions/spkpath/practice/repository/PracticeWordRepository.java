package com.twinlions.spkpath.practice.repository;

import com.twinlions.spkpath.practice.entity.single.WordEntity;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface PracticeWordRepository extends Repository<WordEntity, String> {
    List<WordEntity> findAll();
    Optional<WordEntity> findByWordId(int wordId);
}
