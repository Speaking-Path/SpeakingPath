package com.twinlions.spkpath.practice.entity.composite;

import com.twinlions.spkpath.practice.entity.id.StudySentenceId;
import com.twinlions.spkpath.practice.entity.single.SentenceEntity;
import com.twinlions.spkpath.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "study_sentence_tb")
@IdClass(StudySentenceId.class)
/**
 * 학습한 문장 Entity
 * userId와 stcID를 PK이자 FK로 가지고, 학습횟수인 studyStcCnt를 갖는다.
 */
public class StudySentence {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stc_id")
    private SentenceEntity stcId;
}
