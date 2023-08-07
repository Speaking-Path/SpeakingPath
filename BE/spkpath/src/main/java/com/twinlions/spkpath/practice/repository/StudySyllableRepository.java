package com.twinlions.spkpath.practice.repository;

import com.twinlions.spkpath.practice.entity.composite.StudySyllable;
import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import com.twinlions.spkpath.practice.vo.StudySyllableVO;
import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface StudySyllableRepository extends Repository<StudySyllable, String> {
    StudySyllable save(StudySyllable studySyllable);
    Optional<StudySyllable> findByUserIdAndSlbId(User userId, SyllableEntity slbId);
    Optional<List<StudySyllable>> findByUserId(User userId);

    @Modifying
    void deleteByUserIdAndSlbId(User userId, SyllableEntity slbId);
}
