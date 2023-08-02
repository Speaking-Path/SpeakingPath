package com.twinlions.spkpath.practice.repository;

import com.twinlions.spkpath.practice.entity.composite.StudySentence;
import com.twinlions.spkpath.practice.entity.single.SentenceEntity;
import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface StudySentenceRepository extends Repository<StudySentence, String> {
    StudySentence save(StudySentence studySentence);
    Optional<StudySentence> findByUserIdAndStcId(User userId, SentenceEntity stcId);

    @Modifying
    void deleteByUserIdAndStcId(User userId, SentenceEntity stcId);
}
