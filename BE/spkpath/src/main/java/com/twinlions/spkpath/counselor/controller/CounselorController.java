package com.twinlions.spkpath.counselor.controller;

import com.twinlions.spkpath.user.controller.UserController;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping
@Tag(name = "회원-상담사", description = "회원-상담사 관련 API 입니다.")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class CounselorController {
    private final Logger logger = LoggerFactory.getLogger(CounselorController.class);
}
