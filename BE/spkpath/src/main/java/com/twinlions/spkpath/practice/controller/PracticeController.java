package com.twinlions.spkpath.practice.controller;

import com.twinlions.spkpath.practice.entity.single.SentenceEntity;
import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import com.twinlions.spkpath.practice.entity.single.WordEntity;
import com.twinlions.spkpath.practice.service.PracticeService;
import com.twinlions.spkpath.practice.vo.*;
import com.twinlions.spkpath.user.vo.UserVO;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/practice")
@Api(value = "연습", description = "연습 관련  API입니다.")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT })
public class PracticeController {
    private final PracticeService practiceService;

    @GetMapping(value = "/pron/syllable")
    @Operation(summary = "음절 전체 조회", description = "모든 음절을 반환한다.")
    public ResponseEntity<List<SyllableEntity>> listSyllable(){
        List<SyllableEntity> slbList = practiceService.listAllSyllable();
        return new ResponseEntity<>(slbList, HttpStatus.OK);
    }

    @GetMapping(value = "/pron/word")
    @Operation(summary = "단어 전체 조회", description = "모든 단어를 반환한다.")
    public ResponseEntity<List<WordEntity>> listWord(){
        List<WordEntity> wordList = practiceService.listAllWord();
        return new ResponseEntity<>(wordList, HttpStatus.OK);
    }

    @GetMapping(value = "/pron/sentence")
    @Operation(summary = "문장 전체 조회", description = "모든 문장을 반환한다.")
    public ResponseEntity<List<SentenceEntity>> listSentence(){
        List<SentenceEntity> sentenceList = practiceService.listAllSentence();
        return new ResponseEntity<>(sentenceList, HttpStatus.OK);
    }

    @PostMapping(value = "/pron/syllable/save")
    @Operation(summary = "음절 저장", description = "추가로 학습할 음절을 저장한다.")
    public ResponseEntity<?> saveSyllable(@RequestBody StudySyllableVO studySyllableVO){
        practiceService.saveSyllable(studySyllableVO.getUserId(), studySyllableVO.getSlbId());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/pron/word/save")
    @Operation(summary = "단어 저장", description = "추가로 학습할 단어를 저장한다.")
    public ResponseEntity<?> saveWord(@RequestBody StudyWordVO studyWordVO){
        practiceService.saveWord(studyWordVO.getUserId(), studyWordVO.getWordId());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/pron/sentence/save")
    @Operation(summary = "문장 저장", description = "추가로 학습할 문장을 저장한다.")
    public ResponseEntity<?> saveSentence(@RequestBody StudySentenceVO studySentenceVO){
        practiceService.saveSentence(studySentenceVO.getUserId(), studySentenceVO.getStcId());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/recog/object/save")
    @Operation(summary = "사물 저장", description = "추가로 학습할 사물을 저장한다.")
    public ResponseEntity<?> saveObject(@RequestBody StudyObjectVO studyObjectVO){
        practiceService.saveObject(studyObjectVO.getUserId(), studyObjectVO.getObjId());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/pron/syllable/show")
    @Operation(summary = "저장한 음절 보여주기")
    public ResponseEntity<?> showMySyllable(@RequestBody UserVO userVO){
        return new ResponseEntity<>(practiceService.showMySyllable(userVO.getUserId()), HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/pron/word/show")
    @Operation(summary = "저장한 단어 보여주기")
    public ResponseEntity<?> showMyWord(@RequestBody UserVO userVO){
        return new ResponseEntity<>(practiceService.showMyWord(userVO.getUserId()), HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/pron/sentence/show")
    @Operation(summary = "저장한 문장 보여주기")
    public ResponseEntity<?> showMySentence(@RequestBody UserVO userVO){
        return new ResponseEntity<>(practiceService.showMySentence(userVO.getUserId()), HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/recog/object/show")
    @Operation(summary = "저장한 사물 보여주기")
    public ResponseEntity<?> showMyObject(@RequestBody UserVO userVO){
        return new ResponseEntity<>(practiceService.showMyObject(userVO.getUserId()), HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/pron/syllable/qlist")
    @Operation(summary = "음절 발음 훈련 생성하기")
    public ResponseEntity<?> makeSyllableQuestions(@RequestBody UserVO userVO) {
        return new ResponseEntity<>(practiceService.makeSyllableQuestions(userVO.getUserId(), 10), HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/pron/word/qlist")
    @Operation(summary = "단어 발음 훈련 생성하기")
    public ResponseEntity<?> makeWordQuestions(@RequestBody UserVO userVO) {
        return new ResponseEntity<>(practiceService.makeWordQuestions(userVO.getUserId(), 10), HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/pron/sentence/qlist")
    @Operation(summary = "문장 발음 훈련 생성하기")
    public ResponseEntity<?> makeSentenceQuestions(@RequestBody UserVO userVO) {
        return new ResponseEntity<>(practiceService.makeSentenceQuestions(userVO.getUserId(), 10), HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/recog/object/qlist")
    @Operation(summary = "사물 문제 생성하기")
    public ResponseEntity<?> makeObjectQuestions(@RequestBody UserVO userVO) {
        return new ResponseEntity<>(practiceService.makeObjectQuestions(userVO.getUserId(), 10), HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/recog/object/issaved")
    @Operation(summary = "사물 저장 여부 조회하기")
    public ResponseEntity<?> isSavedObject(@RequestBody ObjectVO objectVO) {
        return new ResponseEntity<>(practiceService.isSavedObject(objectVO.getUserId(), objectVO.getObjId()), HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/correct")
    @Operation(summary = "문제 정답")
    public ResponseEntity<?> answerCorrect(@RequestBody UserVO userVO) {
        return new ResponseEntity<>(practiceService.answerCorrect(userVO.getUserId()), HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/wrong")
    @Operation(summary = "문제 오답")
    public ResponseEntity<?> answerWrong(@RequestBody UserVO userVO) {
        return new ResponseEntity<>(practiceService.answerWrong(userVO.getUserId()), HttpStatus.ACCEPTED);
    }
}