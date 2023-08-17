package com.twinlions.spkpath.consulting.entity;

import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter // Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "reservation_item_tb")// reservation_item_tb와 매칭
@DynamicInsert // Null 인 것은 자동으로 제외하고 넣어줌
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rsv_item_id")
    private int id; // 예약 번호

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "cslt_id")
    private Consultant cslt;

    @Column(name = "rsv_date")
    private LocalDate rsvDate;

    @Column(name = "rsv_time")
    private LocalTime rsvTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "rsv_status")
    private ReservationStatus rsvStatus;

    @Column(name = "rsv_info")
    private String rsvInfo;

    @Column(name = "rsv_code")
    private String rsvCode;

    public void updateReservationStatus(ReservationStatus rsvStatus) {
        this.rsvStatus = rsvStatus;
    }
}
