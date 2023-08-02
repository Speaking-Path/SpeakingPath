package com.twinlions.spkpath.consulting.service;

import com.twinlions.spkpath.consulting.ReservationDto;
import com.twinlions.spkpath.consulting.ScheduleRequestDto;
import com.twinlions.spkpath.consulting.ScheduleResponseDto;

import java.util.List;

public interface ConsultingService {

    ScheduleResponseDto getSchedules(String userId);
    String addSchedule(ScheduleRequestDto scheduleRequestDtoList);
    String addReservation(ReservationDto reservationDto);
    List<ReservationDto> getPastReservations(String userId);
    List<ReservationDto> getUpcomingReservations(String userId);
    List<ReservationDto> getPastReservationsCslt(String csltId);
    List<ReservationDto> getUpcomingReservationsCslt(String csltId);
}
