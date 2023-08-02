package com.twinlions.spkpath.consulting.repository;

import com.twinlions.spkpath.consulting.entity.Reservation;
import org.springframework.data.repository.Repository;

public interface ReservationRepository extends Repository<Reservation, String> {
    // userId의 상담 예약을 조회하는 메서드
    // List<Reservation> findAllByUserId(String UserId);

    // csltId의 상담 예약을 조회하는 메서드
    // List<Reservation> findAllByCsltId(String csltId);

    Reservation save(Reservation reservation);
}
