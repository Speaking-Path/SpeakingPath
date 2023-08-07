package com.twinlions.spkpath.practice;

import com.twinlions.spkpath.practice.entity.single.ObjectEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class QuestionDto {
    List<List<ObjectEntity>> questionList;
    List<ObjectEntity> answerList;
    List<Boolean> savedList;
}