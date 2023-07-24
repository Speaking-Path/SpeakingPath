package com.twinlions.spkpath.counselor.controller;

import com.twinlions.spkpath.counselor.entity.Counselor;
import com.twinlions.spkpath.counselor.service.CounselorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cnslr")
@Tag(name = "회원-상담사", description = "회원-상담사 관련 API 입니다.")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class CounselorController {
    private final Logger logger = LoggerFactory.getLogger(CounselorController.class);

    private final CounselorService counselorService;

    @GetMapping
    @Operation(summary = "상담사 전체 조회", description = "모든 상담사 회원 정보를 조회한다.")
    public ResponseEntity<List<Counselor>> listCnslrs() {
        List<Counselor> cnslrList = counselorService.listCnslrs();
        return new ResponseEntity<>(cnslrList, HttpStatus.OK);
    }
}
