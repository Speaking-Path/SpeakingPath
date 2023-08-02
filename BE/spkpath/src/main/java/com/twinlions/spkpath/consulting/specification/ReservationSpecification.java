package com.twinlions.spkpath.consulting.specification;

import com.twinlions.spkpath.consulting.entity.Reservation;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class ReservationSpecification {
    public static Specification<Reservation> lessRsvDate(LocalDate date) {
        return (root, query, CriteriaBuilder) -> {
            return CriteriaBuilder.lessThan(root.get("rsvDate"), date);
        };
    }

    public static Specification<Reservation> greaterRsvDate(LocalDate date) {
        return (root, query, CriteriaBuilder) -> {
            return CriteriaBuilder.greaterThan(root.get("rsvDate"), date);
        };
    }

    public static Specification<Reservation> equalsRsvDate(LocalDate date) {
        return (root, query, CriteriaBuilder) -> {
            return CriteriaBuilder.equal(root.get("rsvDate"), date);
        };
    }

    public static Specification<Reservation> lessRsvTime(LocalTime time) {
        return (root, query, CriteriaBuilder) -> {
            return CriteriaBuilder.lessThan(root.get("rsvTime"), time);
        };
    }

    public static Specification<Reservation> greaterRsvTime(LocalTime time) {
        return (root, query, CriteriaBUilder) -> {
            return CriteriaBUilder.greaterThan(root.get("rsvTime"), time);
        };
    }
}
