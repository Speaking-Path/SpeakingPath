package com.twinlions.spkpath.practice.service;

import com.twinlions.spkpath.practice.QuestionDto;
import com.twinlions.spkpath.practice.entity.single.ObjectEntity;
import com.twinlions.spkpath.practice.entity.single.SentenceEntity;
import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import com.twinlions.spkpath.practice.entity.single.WordEntity;
import com.twinlions.spkpath.practice.vo.StudyObjectVO;
import com.twinlions.spkpath.practice.vo.StudySentenceVO;
import com.twinlions.spkpath.practice.vo.StudySyllableVO;
import com.twinlions.spkpath.practice.vo.StudyWordVO;

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

    List<StudySyllableVO> showMySyllable(String userId);
    List<StudyWordVO> showMyWord(String userId);
    List<StudySentenceVO> showMySentence(String userId);
    List<StudyObjectVO> showMyObject(String userId);


    QuestionDto makeObjectQuestions(String userId, int quesitonSize, int vocaSize);

}
