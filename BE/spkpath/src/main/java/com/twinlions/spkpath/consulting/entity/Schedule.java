package com.twinlions.spkpath.consulting.entity;

import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consulting.key.SchedulePK;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter // Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "consultant_available_info")// consultant_available_tb와 매칭
@DynamicInsert // Null 인 것은 자동으로 제외하고 넣어줌
public class Schedule {

    @EmbeddedId
    private SchedulePK schedulePK;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable = false, updatable = false)
    private Consultant consultant;

    @Override
    public String toString() {
        return "Schedule{" +
                "schedulePK=" + schedulePK +
                '}';
    }
}
