package com.twinlions.spkpath.consultant.service;

import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.consultant.ConsultantSearchDto;
import com.twinlions.spkpath.consultant.Specification.ConsultantSpecification;
import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consultant.repository.ConsultantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsultantServiceImpl implements ConsultantService {

    private final ConsultantRepository consultantRepository;

    /**
     * @return List<User> 전체 상담사 리스트
     */
    @Override
    public List<ConsultantDto> listCslt() {
        List<Consultant> consultants = consultantRepository.findAll();
        return consultants.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
//        if (consultantRepository.findAll() != null) {
//            return consultantRepository.findAll();
//        }
//        return null;
    }

    @Override
    public List<ConsultantDto> listCsltByCond(ConsultantSearchDto consultantDto) {
        Specification<Consultant> spec = ((root, query, criteriaBuilder) -> null);

        if (consultantDto.getUserName() != null) {
            spec = spec.and(ConsultantSpecification.equalsName(consultantDto.getUserName()));
        }

        if (consultantDto.getUserSex() != null) {
            spec = spec.and(ConsultantSpecification.equalsSex(consultantDto.getUserSex()));
        }

        if (consultantDto.getCsltExp() != 0) {
            spec = spec.and(ConsultantSpecification.betweenExp(consultantDto.getCsltExp()));
        }

        if (consultantDto.getCsltTag() != null) {
            for (String tag : consultantDto.getCsltTag()) {
                spec = spec.and(ConsultantSpecification.containsTag(tag));
            }
        }

        if (consultantDto.getCsltBoundary() != null) {
            for (String boundary : consultantDto.getCsltBoundary()) {
                spec = spec.and(ConsultantSpecification.containsBoundary(boundary));
            }
        }

        List<Consultant> consultants = consultantRepository.findAll(spec);
        return consultants.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

//    private Consultant convertFromDto(ConsultantDto consultantDto) {
//        return Consultant.builder()
//                .userId(consultantDto.getUserId())
//                .userEmail(consultantDto.getUserEmail())
//                .userAge(consultantDto.getUserAge())
//                .userGrade(consultantDto.getUserGrade())
//                .userName(consultantDto.getUserName())
//                .userPhone(consultantDto.getUserPhone())
//                .userPwd(consultantDto.getUserPwd())
//                .userSex(consultantDto.getUserSex())
//                .csltExp(consultantDto.getCsltExp())
//                .csltTeam(consultantDto.getCsltTeam())
//                .build();
//    }

    private ConsultantDto convertToDto(Consultant consultant) {
        ConsultantDto consultantDto = new ConsultantDto();
        consultantDto.setUserId(consultant.getUserId());
        consultantDto.setUserEmail(consultant.getUserEmail());
        consultantDto.setUserAge(consultant.getUserAge());
        consultantDto.setUserGrade(consultant.getUserGrade());
        consultantDto.setUserPhone(consultant.getUserPhone());
        consultantDto.setUserPwd(consultant.getUserPwd());
        consultantDto.setUserSex(consultant.getUserSex());
        consultantDto.setCsltTeam(consultant.getCsltTeam());
        consultantDto.setCsltExp(consultant.getCsltExp());
        consultantDto.setCsltTagFromList(consultant.getCsltTags());
        consultantDto.setCsltBoundaryFromList(consultant.getCsltBoundaries());
        return consultantDto;
    }
}
