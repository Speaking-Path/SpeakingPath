package com.twinlions.spkpath.counselor.entity;

import com.twinlions.spkpath.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter // Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "counselor_info_tb") // counselor_info_tb와 매칭
@DynamicInsert // Null 인 것은 자동으로 제외하고 넣어줌
public class Counselor extends User {

    @Column(name = "cnslr_team")
    private String cnslrTeam;

    @Column(name = "cnslr_exp")
    private String cnslrExp;

    @Column(name = "cnslr_tag")
    private String cnslrTag;

    @Column(name = "cnslr_boundary")
    private String cnslrBoundary;
}
