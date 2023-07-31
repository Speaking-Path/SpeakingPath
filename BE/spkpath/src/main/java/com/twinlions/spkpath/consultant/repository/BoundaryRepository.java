package com.twinlions.spkpath.consultant.repository;

import com.twinlions.spkpath.consultant.entity.Boundary;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface BoundaryRepository extends Repository<Boundary, String> {
    Optional<Boundary> findByBoundaryName(String boundaryName);
}
