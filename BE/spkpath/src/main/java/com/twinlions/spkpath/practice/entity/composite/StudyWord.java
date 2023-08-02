package com.twinlions.spkpath.practice.entity.composite;

import com.twinlions.spkpath.practice.entity.id.StudyWordId;
import com.twinlions.spkpath.practice.entity.single.WordEntity;
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
@Table(name = "study_word_tb")
@IdClass(StudyWordId.class)
/**
 * 학습한 단어 Entity
 * userId와 wordId를 PK이자 FK로 가지고, studyWordCnt를 갖는다.
 */
public class StudyWord {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "word_id")
    private WordEntity wordId;
}
