package com.twinlions.spkpath.practice;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class QuestionDto {
    List<List<Integer>> questionList;
    List<Integer> answerList;
    List<Boolean> savedList;
}