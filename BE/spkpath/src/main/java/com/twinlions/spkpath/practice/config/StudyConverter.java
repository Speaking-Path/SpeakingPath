package com.twinlions.spkpath.practice.config;

import com.twinlions.spkpath.practice.entity.composite.StudyObject;
import com.twinlions.spkpath.practice.entity.composite.StudySentence;
import com.twinlions.spkpath.practice.entity.composite.StudySyllable;
import com.twinlions.spkpath.practice.entity.composite.StudyWord;
import com.twinlions.spkpath.practice.vo.StudyObjectVO;
import com.twinlions.spkpath.practice.vo.StudySentenceVO;
import com.twinlions.spkpath.practice.vo.StudySyllableVO;
import com.twinlions.spkpath.practice.vo.StudyWordVO;

/**
 * Study** Entity를 VO로 변환하는 변환기
 */
public class StudyConverter {
    public StudySyllableVO syllableToSyllableVO(StudySyllable source) {
        StudySyllableVO studySyllableVO = new StudySyllableVO();
        studySyllableVO.setUserId(source.getUserId().getUserId());
        studySyllableVO.setSlbId(source.getSlbId().getSlbId());
        return studySyllableVO;
    }
    public StudyWordVO wordToWordVO(StudyWord source) {
        StudyWordVO studyWordVO = new StudyWordVO();
        studyWordVO.setUserId(source.getUserId().getUserId());
        studyWordVO.setWordId(source.getWordId().getWordId());
        return studyWordVO;
    }
    public StudySentenceVO sentenceToSentenceVO(StudySentence source) {
        StudySentenceVO studySentenceVO = new StudySentenceVO();
        studySentenceVO.setUserId(source.getUserId().getUserId());
        studySentenceVO.setStcId(source.getStcId().getStcId());
        return studySentenceVO;
    }

    public StudyObjectVO objectToObjectVO(StudyObject source) {
        StudyObjectVO studyObjectVO = new StudyObjectVO();
        studyObjectVO.setUserId(source.getUserId().getUserId());
        studyObjectVO.setObjId(source.getObjId().getObjId());
        return studyObjectVO;
    }
}