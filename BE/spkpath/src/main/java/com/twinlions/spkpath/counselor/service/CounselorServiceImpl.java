package com.twinlions.spkpath.counselor.service;

import com.twinlions.spkpath.counselor.CounselorDto;
import com.twinlions.spkpath.counselor.repository.CounselorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CounselorServiceImpl implements CounselorService {

    private final CounselorRepository counselorRepository;

}
