package com.twinlions.spkpath.consultant.repository;

import com.twinlions.spkpath.consultant.entity.ConsultantTag;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface ConsultantTagRepository extends Repository<ConsultantTag, String>  {
    ConsultantTag save(ConsultantTag consultantTag);
}
