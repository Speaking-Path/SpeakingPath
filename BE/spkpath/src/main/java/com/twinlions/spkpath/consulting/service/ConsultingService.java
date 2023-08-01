package com.twinlions.spkpath.consulting.service;

import com.twinlions.spkpath.consulting.ScheduleRequestDto;
import com.twinlions.spkpath.consulting.ScheduleResponseDto;
import com.twinlions.spkpath.consulting.entity.Schedule;

import java.util.List;

public interface ConsultingService {

    ScheduleResponseDto getSchedule(String userId);
    String addSchedule(ScheduleRequestDto scheduleRequestDtoList);
}
