package com.twinlions.spkpath.practice.entity.composite;

import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import com.twinlions.spkpath.practice.entity.id.StudySyllableId;
import com.twinlions.spkpath.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "study_syllable_tb")
@IdClass(StudySyllableId.class)
/**
 * 학습한 음절 Entity
 * userId와 slbID를 PK이자 FK로 가지고, 학습횟수인 studySlbCnt를 갖는다.
 */
public class StudySyllable {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "slb_id")
    private SyllableEntity slbId;
}
