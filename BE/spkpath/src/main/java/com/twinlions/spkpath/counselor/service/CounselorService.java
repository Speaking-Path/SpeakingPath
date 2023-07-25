package com.twinlions.spkpath.counselor.service;

import com.twinlions.spkpath.counselor.CounselorDto;
import com.twinlions.spkpath.counselor.entity.Counselor;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface CounselorService {
    List<Counselor> listCnslrs();
    List<Counselor> listCnslrsByCond(@RequestBody CounselorDto counselorDto);
}
