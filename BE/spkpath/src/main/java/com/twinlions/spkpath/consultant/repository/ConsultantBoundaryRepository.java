package com.twinlions.spkpath.consultant.repository;

import com.twinlions.spkpath.consultant.entity.ConsultantBoundary;
import org.springframework.data.repository.Repository;

public interface ConsultantBoundaryRepository extends Repository<ConsultantBoundary, String>  {
    ConsultantBoundary save(ConsultantBoundary consultantBoundary);
}
