package com.twinlions.spkpath.practice.repository;

import com.twinlions.spkpath.practice.entity.composite.StudyObject;
import com.twinlions.spkpath.practice.entity.single.ObjectEntity;
import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface StudyObjectRepository extends Repository<StudyObject, String> {
    StudyObject save(StudyObject studyObject);
    Optional<StudyObject> findByUserIdAndObjId(User userId, ObjectEntity objId);

    @Modifying
    void deleteByUserIdAndObjId(User userId, ObjectEntity objId);
}
