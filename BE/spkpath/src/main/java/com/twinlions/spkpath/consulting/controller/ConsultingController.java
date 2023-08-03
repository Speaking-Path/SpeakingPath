package com.twinlions.spkpath.consulting.controller;

import com.twinlions.spkpath.consulting.ReservationDto;
import com.twinlions.spkpath.consulting.ScheduleRequestDto;
import com.twinlions.spkpath.consulting.ScheduleResponseDto;
import com.twinlions.spkpath.consulting.service.ConsultingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("cslting")
@Tag(name = "상담사-상담일정", description = "상담사-상담일정 관련 API 입니다.")
public class ConsultingController {

    // userId의 예약 내역 -- 앞으로의 예약 / 지난 예약 구분해서 보내준다.
    // Reservation C, R, U, D

    private final ConsultingService consultingService;


    @GetMapping(value = "/sche")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "상담가능시간 조회", description = "사용자가 특정 상담사의 상담 가능 일정을 조회한다.")
    public ResponseEntity<?> getSchedules(@RequestParam String userId) {
        ScheduleResponseDto scheduleList = consultingService.getSchedules(userId);
        if (scheduleList != null) {
            return new ResponseEntity<>(scheduleList, HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping(value = "/addsche")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "상담가능시간 추가", description = "상담사가 상담 가능 일정을 추가한다.")
    public ResponseEntity<?> addSchedule(@RequestBody ScheduleRequestDto scheduleRequestDto) {
        String result = consultingService.addSchedule(scheduleRequestDto);
        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping(value = "/pastrsv")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "일반회원 지난 예약내역 조회", description = "일반회원이 지난 예약내역을 조회한다.")
    public ResponseEntity<?> getPastReservations(@RequestParam String userId) {
        List<ReservationDto> reservationDtoList = consultingService.getPastReservations(userId);
        return new ResponseEntity<>(reservationDtoList, HttpStatus.OK);
    }

    @PostMapping(value = "/upcomingrsv")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "일반회원 예정된 예약내역 조회", description = "일반회원이 예정된 예약내역을 조회한다.")
    public ResponseEntity<?> getUpcomingReservations(@RequestParam String userId) {
        List<ReservationDto> reservationDtoList = consultingService.getUpcomingReservations(userId);
        return new ResponseEntity<>(reservationDtoList, HttpStatus.OK);
    }

    @PostMapping(value = "pastrsvcslt")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "상담사 지난 예약내역 조회", description = "상담사가 지난 예약내역을 조회한다.")
    public ResponseEntity<?> getPastReservationsCslt(@RequestParam String csltId) {
        List<ReservationDto> reservationDtoList = consultingService.getPastReservationsCslt(csltId);
        return new ResponseEntity<>(reservationDtoList, HttpStatus.OK);
    }

    @PostMapping(value = "upcomingrsvcslt")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "상담사 예정된 예약내역 조회", description = "상담사가 예정된 예약 내역을 조회한다.")
    public ResponseEntity<?> getUpcomingReservationsCslt(@RequestParam String csltId) {
        List<ReservationDto> reservationDtoList = consultingService.getUpcomingReservationsCslt(csltId);
        return new ResponseEntity<>(reservationDtoList, HttpStatus.OK);
    }

    @PostMapping(value = "/addrsv")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "상담예약 신청", description = "사용자가 상담 예약을 신청한다.")
    public ResponseEntity<?> addReservation(@RequestBody ReservationDto reservationDto) {
        String result = consultingService.addReservation(reservationDto);
        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Transactional
    @GetMapping(value = "/approversv")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "상담예약 승인", description = "상담사가 상담 예약을 승인한다.")
    public ResponseEntity<?> approveReservation(@RequestParam int id) {
        String result = consultingService.approveReservation(id);
        if (result != null) {
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Transactional
    @GetMapping(value = "/declinersv")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "상담예약 거절", description = "상담사가 상담예약을 거절한다.")
    public ResponseEntity<?> declineReservation(@RequestParam int id) {
        String result = consultingService.declineReservation(id);
        if (result != null) {
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Transactional
    @GetMapping(value = "cancelrsv")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "상담예약 취소", description = "상담사가 상담예약을 취소한다.")
    public ResponseEntity<?> cancelReservation(@RequestParam int id) {
        String result = consultingService.cancelReservation(id);
        if (result != null) {
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

}
