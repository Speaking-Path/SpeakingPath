package com.twinlions.spkpath.practice;

import com.twinlions.spkpath.practice.entity.single.SentenceEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SentenceQuestionDto {
    List<SentenceEntity> questionList;
    List<Boolean> savedList;
}