package com.twinlions.spkpath.consultant.repository;

import com.twinlions.spkpath.consultant.entity.ConsultantBoundary;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface ConsultantBoundaryRepository extends Repository<ConsultantBoundary, String>  {
    Optional<List<ConsultantBoundary>> findByBoundaryBoundaryId(String boundaryId);
    ConsultantBoundary save(ConsultantBoundary consultantBoundary);
}
