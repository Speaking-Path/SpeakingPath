package com.twinlions.spkpath.practice.controller;

import com.twinlions.spkpath.practice.entity.single.SentenceEntity;
import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import com.twinlions.spkpath.practice.entity.single.WordEntity;
import com.twinlions.spkpath.practice.service.PracticeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/practice")
@Tag(name = "연습", description = "연습 관련  API입니다.")
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
}
