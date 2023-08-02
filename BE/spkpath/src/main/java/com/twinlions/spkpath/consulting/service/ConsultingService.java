package com.twinlions.spkpath.consulting.service;

import com.twinlions.spkpath.consulting.ReservationDto;
import com.twinlions.spkpath.consulting.ScheduleRequestDto;
import com.twinlions.spkpath.consulting.ScheduleResponseDto;

public interface ConsultingService {

    ScheduleResponseDto getSchedule(String userId);
    String addSchedule(ScheduleRequestDto scheduleRequestDtoList);
    String addReservation(ReservationDto reservationDto);
}
