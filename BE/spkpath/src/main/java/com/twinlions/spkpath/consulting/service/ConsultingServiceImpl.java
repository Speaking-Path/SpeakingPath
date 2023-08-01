package com.twinlions.spkpath.consulting.service;

import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consultant.repository.ConsultantRepository;
import com.twinlions.spkpath.consulting.DateResponseDto;
import com.twinlions.spkpath.consulting.ScheduleRequestDto;
import com.twinlions.spkpath.consulting.DateRequestDto;
import com.twinlions.spkpath.consulting.ScheduleResponseDto;
import com.twinlions.spkpath.consulting.entity.Schedule;
import com.twinlions.spkpath.consulting.key.SchedulePK;
import com.twinlions.spkpath.consulting.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsultingServiceImpl implements ConsultingService {

    private final ConsultantRepository consultantRepository;
    private final ScheduleRepository scheduleRepository;


    /**
     * 사용자가 선택한 상담사의 상담 가능시간을 조회하는 메서드 -- 3개월
     *
     * @param userId 사용자 ID
     * @return List<ScheduleResponseDto>
     */
    public ScheduleResponseDto getSchedule(@RequestParam String userId) {
        // 오늘 날짜와 3개월 뒤 날짜 구함
        LocalDate ldStart = LocalDate.now();
        LocalDate ldEnd = ldStart.plusMonths(3);

        List<LocalDate> ldList = (ldStart.plusDays(1)).datesUntil(ldEnd)
                .collect(Collectors.toList());

        // 오늘 처리
        List<Schedule> tList = scheduleRepository.findAllBySchedulePKUserIdAndSchedulePKAvailableDate(userId, ldStart);
        List<Schedule> scheduleList = new ArrayList<>();
        for (Schedule sc: tList) {
            if (LocalDateTime.of(sc.getSchedulePK().getAvailableDate(), sc.getSchedulePK().getAvailableTime()).isAfter(LocalDateTime.now())) {
                scheduleList.add(sc);
            }
        }

        for (LocalDate ld: ldList) {
            scheduleList.addAll(scheduleRepository.findAllBySchedulePKUserIdAndSchedulePKAvailableDate(userId, ld));
        }

        Map<LocalDate, List<Schedule>> groupedSchedule = scheduleList.stream()
                .collect(Collectors.groupingBy(sc -> sc.getSchedulePK().getAvailableDate()));


        List<DateResponseDto> dateResponseDtoList = groupedSchedule.entrySet().stream()
                .map(entry -> convertToDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());

        return new ScheduleResponseDto(userId, dateResponseDtoList);
    }

    /**
     * 상담사가 상담 가능시간을 저장하는 메서드
     *
     * @param scheduleRequestDto 사용자ID, 상담가능일, 상담가능시간
     * @return 저장 성공시 "success", 실패 시 null
     */
    public String addSchedule(ScheduleRequestDto scheduleRequestDto) {
        // 연-월-일 -> LocalDate로 변환
        // times -> LocalTime으로 변환
        String userId = scheduleRequestDto.getUserId();
        Consultant consultant = consultantRepository.findByUserId(userId);

        try {
            for (DateRequestDto dto: scheduleRequestDto.getTimeSelected()) {
                for (int day: dto.getDays()) {
                    // 연-월-일 -> LocalDate로 변환
                    LocalDate ld = LocalDate.of(dto.getYear(), dto.getMonth(), day);
                    for (int time: scheduleRequestDto.getTimes()) {
                        // times -> LocalTime으로 변환
                        LocalTime lt = LocalTime.of(time, 0);

                        // AvailableInfo entity 생성
                        Schedule schedule = Schedule.builder()
                                .schedulePK(new SchedulePK(userId, ld, lt))
                                .consultant(consultant)
                                .build();
                        // save
                        scheduleRepository.save(schedule);
                    }
                }
            }
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private DateResponseDto convertToDto(LocalDate date, List<Schedule> schedules) {
        List<Integer> times = schedules.stream()
                .map(sc -> sc.getSchedulePK().getAvailableTime().getHour())
                .collect(Collectors.toList());

        return new DateResponseDto(date.getYear(), date.getMonthValue(), date.getDayOfMonth(), times);
    }
}
