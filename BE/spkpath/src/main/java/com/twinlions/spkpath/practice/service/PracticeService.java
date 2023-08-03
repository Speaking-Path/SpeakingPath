package com.twinlions.spkpath.practice.service;

import com.twinlions.spkpath.practice.entity.single.ObjectEntity;
import com.twinlions.spkpath.practice.entity.single.SentenceEntity;
import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import com.twinlions.spkpath.practice.entity.single.WordEntity;

import java.util.List;

public interface PracticeService {
    List<WordEntity> listAllWord();
    List<ObjectEntity> listAllObject();
    List<SentenceEntity> listAllSentence();
    List<SyllableEntity> listAllSyllable();

    void saveSyllable(String userId, int slbId);
    void saveWord(String userId, int wordId);
    void saveSentence(String userId, int stcId);
    void saveObject(String uesrId, int objId);
}
