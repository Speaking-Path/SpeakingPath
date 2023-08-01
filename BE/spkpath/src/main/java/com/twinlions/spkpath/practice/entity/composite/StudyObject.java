package com.twinlions.spkpath.practice.entity.composite;

import com.twinlions.spkpath.practice.entity.id.StudyObjectId;
import com.twinlions.spkpath.practice.entity.single.ObjectEntity;
import com.twinlions.spkpath.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "study_object_tb")
@IdClass(StudyObjectId.class)
/**
 * 학습한 사물 Entity
 * userId와 objID를 PK이자 FK로 가지고, 학습횟수인 studyObjCnt를 갖는다.
 */
public class StudyObject {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "obj_id")
    private ObjectEntity objId;
}
