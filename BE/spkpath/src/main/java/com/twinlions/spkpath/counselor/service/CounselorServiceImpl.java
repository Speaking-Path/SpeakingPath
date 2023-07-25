package com.twinlions.spkpath.counselor.service;

import com.twinlions.spkpath.counselor.CounselorDto;
import com.twinlions.spkpath.counselor.entity.Counselor;
import com.twinlions.spkpath.counselor.repository.CounselorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CounselorServiceImpl implements CounselorService {

    private final CounselorRepository counselorRepository;

    /**
     * @return List<User> 전체 상담사 리스트
     */
    @Override
    public List<Counselor> listCnslrs() {
        if (counselorRepository.findAll().isPresent()) {
            return (List<Counselor>)counselorRepository.findAll().get();
        }
        return null;
    }

    @Override
    public List<Counselor> listCnslrsByCond(CounselorDto counselorDto) {
        return null;
    }
}
