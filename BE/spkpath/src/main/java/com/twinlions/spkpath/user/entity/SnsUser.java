package com.twinlions.spkpath.user.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SnsUser {
    @Id
    @Column(name = "id")
    private String id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder

    public SnsUser(String id, User user) {
        this.id = id;
        this.user = user;
    }
}
