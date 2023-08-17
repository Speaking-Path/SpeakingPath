package com.twinlions.spkpath.practice;

import com.twinlions.spkpath.practice.entity.single.WordEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class WordQuestionDto {
    List<WordEntity> questionList;
    List<Boolean> savedList;
}