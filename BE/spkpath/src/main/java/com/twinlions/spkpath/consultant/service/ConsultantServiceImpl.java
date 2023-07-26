package com.twinlions.spkpath.consultant.service;

import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consultant.repository.ConsultantRepository;
import lombok.RequiredArgsConstructor;
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
        return null;
    }

}
