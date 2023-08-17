package com.twinlions.spkpath.practice;

import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SyllableQuestionDto {
    List<SyllableEntity> questionList;
    List<Boolean> savedList;
}