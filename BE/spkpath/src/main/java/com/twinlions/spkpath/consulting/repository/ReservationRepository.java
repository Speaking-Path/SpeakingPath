package com.twinlions.spkpath.consulting.repository;

import com.twinlions.spkpath.consulting.entity.Reservation;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface ReservationRepository extends Repository<Reservation, String> {

    List<Reservation> findAll(Specification<Reservation> spec);

    // 예약 id로 상담 예약을 조회하는 메서드
    Reservation findById(int id);

    Reservation save(Reservation reservation);
}
