package com.twinlions.spkpath.practice.controller;

import com.twinlions.spkpath.practice.entity.single.SentenceEntity;
import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import com.twinlions.spkpath.practice.entity.single.WordEntity;
import com.twinlions.spkpath.practice.service.PracticeService;
import com.twinlions.spkpath.practice.vo.StudySentenceVO;
import com.twinlions.spkpath.practice.vo.StudySyllableVO;
import com.twinlions.spkpath.practice.vo.StudyWordVO;
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
}