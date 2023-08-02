package com.twinlions.spkpath.consulting.specification;

import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consulting.entity.Reservation;
import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import java.time.LocalDate;
import java.time.LocalTime;

public class ReservationSpecification {
    public static Specification<Reservation> equalsUserId(String userId) {
        return (root, query, CriteriaBuilder) -> {
            Join<Reservation, User> userJoin = root.join("user");
            return CriteriaBuilder.equal(userJoin.get("userId"), userId);
        };
    }

    public static Specification<Reservation> equalsCsltId(String csltId) {
        return (root, query, CriteriaBuilder) -> {
            Join<Reservation, Consultant> csltJoin = root.join("cslt");
                return CriteriaBuilder.equal(csltJoin.get("userId"), csltId);
        };
    }

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
