package com.twinlions.spkpath.consulting.key;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

@Getter
@AllArgsConstructor
public class AvailableInfoPK implements Serializable {
    private String userId;
    private LocalDate availableDate;
    private LocalTime availableTime;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AvailableInfoPK that = (AvailableInfoPK) o;
        return Objects.equals(userId, that.userId) && Objects.equals(availableDate, that.availableDate) && Objects.equals(availableTime, that.availableTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, availableDate, availableTime);
    }
}
