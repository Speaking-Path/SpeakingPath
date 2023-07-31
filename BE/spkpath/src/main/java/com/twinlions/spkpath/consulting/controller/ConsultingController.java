package com.twinlions.spkpath.consulting.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("consulting")
public class ConsultingController {
    // 오늘 날짜 보내주면, 해당 월에서 오늘 이후의 정보를 모두 넘겨준다.

    // userId의 예약 내역 -- 앞으로의 예약 / 지난 예약 구분해서 보내준다.

    // Reservation C, R, U, D
}
