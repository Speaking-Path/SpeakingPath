package com.twinlions.spkpath.consultant.service;

import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.consultant.entity.Consultant;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ConsultantService {
    List<Consultant> listCslt();
    List<Consultant> listCsltByCond(@RequestBody ConsultantDto consultantDto);
}
