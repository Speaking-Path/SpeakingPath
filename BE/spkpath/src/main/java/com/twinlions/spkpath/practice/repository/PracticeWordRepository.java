package com.twinlions.spkpath.practice.repository;

import com.twinlions.spkpath.practice.entity.single.WordEntity;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface PracticeWordRepository extends Repository<WordEntity, String> {
    List<WordEntity> findAll();
}
