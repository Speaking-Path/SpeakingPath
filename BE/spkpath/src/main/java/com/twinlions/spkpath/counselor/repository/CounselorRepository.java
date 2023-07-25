package com.twinlions.spkpath.counselor.repository;

import com.twinlions.spkpath.counselor.CounselorDto;
import com.twinlions.spkpath.counselor.entity.Counselor;
import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface CounselorRepository extends Repository<Counselor, String> {
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
    Optional<Object> findByCnslrBoundary(String cnslrBoundary);

    Counselor save(Counselor counselor);
}
