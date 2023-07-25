package com.twinlions.spkpath.consultant.repository;

import com.twinlions.spkpath.consultant.entity.Consultant;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface ConsultantRepository extends Repository<Consultant, String> {
    Optional<Object> findAll();
    Optional<Object> findByUserId(String userId);
    // 이름으로 검색 / like로 일부 검색 구현
//    Optional<Object> findByUserNameContains(String userName);
    // 성별로 검색
//    Optional<Object> findByUserSex(String userSex);
    // 경력으로 검색(범위)
//    Optional<Object> findByCnslrExpBetween(String cnslrExp);
    // 태그로 검색(배열)
//    Optional<Object> findByCnslrTag(String cnslrTag);
    // 분야로 검색
    Optional<Object> findByCsltBoundary(String csltBoundary);

    Consultant save(Consultant consultant);
}

