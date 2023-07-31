package com.twinlions.spkpath.consultant.service;

import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.consultant.ConsultantSearchDto;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ConsultantService {
    List<ConsultantDto> listCslt();
    List<ConsultantDto> listCsltByCond(@RequestBody ConsultantSearchDto consultantDto);
}
