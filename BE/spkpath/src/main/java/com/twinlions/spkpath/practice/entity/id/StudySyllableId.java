package com.twinlions.spkpath.practice.entity.id;

import java.io.Serializable;
import java.util.Objects;

/**
 * 복합키 설정을 위한 클래스
 */
public class StudySyllableId implements Serializable {
    private String userId;
    private int slbId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StudySyllableId that = (StudySyllableId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(slbId, that.slbId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, slbId);
    }
}