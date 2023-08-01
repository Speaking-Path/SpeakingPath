package com.twinlions.spkpath.consulting.service;

import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consultant.repository.ConsultantRepository;
import com.twinlions.spkpath.consultant.service.ConsultantService;
import com.twinlions.spkpath.consulting.AvailableInfoDto;
import com.twinlions.spkpath.consulting.DateDto;
import com.twinlions.spkpath.consulting.entity.AvailableInfo;
import com.twinlions.spkpath.consulting.key.AvailableInfoPK;
import com.twinlions.spkpath.consulting.repository.AvailableInfoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class ConsultingServiceImpl implements ConsultingService {

    private ConsultantRepository consultantRepository;
    private AvailableInfoRepository availableInfoRepository;

    /**
     * 상담사가 상담 가능시간을 저장하는 메서드
     *
     * @param availableInfoDto 사용자ID, 상담가능일, 상담가능시간
     * @return String
     */
    public String addSchedule(AvailableInfoDto availableInfoDto) {
        // 연-월-일 -> LocalDate로 변환
        // times -> LocalTime으로 변환
        String userId = availableInfoDto.getUserId();
        Consultant consultant = (Consultant)consultantRepository.findByUserId(userId).get();
        for (DateDto dto: availableInfoDto.getDays()) {
            for (int day: dto.getDays()) {
                // 연-월-일 -> LocalDate로 변환
                LocalDate ld = LocalDate.of(dto.getYear(), dto.getMonth(), day);
                for (int time: availableInfoDto.getTimes()) {
                    // times -> LocalTime으로 변환
                    LocalTime lt = LocalTime.of(time, 0);

                    // AvailableInfo entity 생성
                    AvailableInfo availableInfo = AvailableInfo.builder()
                            .availableInfoPK(new AvailableInfoPK(userId, ld, lt))
                            .consultant(consultant)
                            .build();
                    // save
                    availableInfoRepository.save(availableInfo);
                }
            }
        }

        return null;
    }
}
