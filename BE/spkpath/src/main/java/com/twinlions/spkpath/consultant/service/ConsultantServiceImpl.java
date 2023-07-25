package com.twinlions.spkpath.consultant.service;

import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consultant.repository.ConsultantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultantServiceImpl implements ConsultantService {

    private final ConsultantRepository counselorRepository;

    /**
     * @return List<User> 전체 상담사 리스트
     */
    @Override
    public List<Consultant> listCslt() {
        if (counselorRepository.findAll().isPresent()) {
            return (List<Consultant>)counselorRepository.findAll().get();
        }
        return null;
    }
}
