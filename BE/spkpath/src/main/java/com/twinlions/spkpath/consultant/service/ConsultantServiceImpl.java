package com.twinlions.spkpath.consultant.service;

import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.consultant.Specification.ConsultantSpecification;
import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consultant.repository.ConsultantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultantServiceImpl implements ConsultantService {

    private final ConsultantRepository consultantRepository;

    /**
     * @return List<User> 전체 상담사 리스트
     */
    @Override
    public List<Consultant> listCslt() {
        if (consultantRepository.findAll().isPresent()) {
            return (List<Consultant>)consultantRepository.findAll().get();
        }
        return null;
    }

    @Override
    public List<Consultant> listCsltByCond(ConsultantDto consultantDto) {
        Specification<Consultant> spec = ((root, query, criteriaBuilder) -> null);

        if (consultantDto.getUserName() != null) {
            spec = spec.and(ConsultantSpecification.equalsName(consultantDto.getUserName()));
        }
        if (consultantDto.getUserSex() != null) {
            spec = spec.and(ConsultantSpecification.equalsSex(consultantDto.getUserSex()));
        }
        if (consultantDto.getCsltTag() != null) {
            List<Specification<Consultant>> sList = ConsultantSpecification.containsTag(consultantDto.getCsltTag());
            for (int i = 0; i < consultantDto.getCsltTag().size(); i++) {
                spec = spec.and(sList.get(i));
            }
        }
        if (consultantDto.getCsltBoundary() != null) {
            List<Specification<Consultant>> sList = ConsultantSpecification.containsBoundary(consultantDto.getCsltBoundary());
            for (int i = 0; i < consultantDto.getCsltBoundary().size(); i++) {
                spec = spec.and(sList.get(i));
            }
        }
        return consultantRepository.findAll(spec);
    }

}
