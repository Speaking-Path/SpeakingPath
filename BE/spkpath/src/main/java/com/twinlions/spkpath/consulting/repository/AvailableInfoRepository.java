package com.twinlions.spkpath.consulting.repository;

import com.twinlions.spkpath.consulting.entity.AvailableInfo;
import org.springframework.data.repository.Repository;

public interface AvailableInfoRepository extends Repository<AvailableInfo, String> {
    AvailableInfo save(AvailableInfo availableInfo);
}
