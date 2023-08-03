package com.twinlions.spkpath.practice.repository;

import com.twinlions.spkpath.practice.entity.composite.StudyWord;
import com.twinlions.spkpath.practice.entity.single.WordEntity;
import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface StudyWordRepository extends Repository<StudyWord, String> {
    StudyWord save(StudyWord studyWord);
    Optional<StudyWord> findByUserIdAndWordId(User userId, WordEntity wordId);
    Optional<List<StudyWord>> findByUserId(User userId);
    @Modifying
    void deleteByUserIdAndWordId(User userId, WordEntity wordId);
}
