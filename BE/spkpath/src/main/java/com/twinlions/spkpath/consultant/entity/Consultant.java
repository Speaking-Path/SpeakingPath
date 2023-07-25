package com.twinlions.spkpath.consultant.entity;

import com.twinlions.spkpath.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter // Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "consultant_info_tb") // counselor_info_tb와 매칭
@DynamicInsert // Null 인 것은 자동으로 제외하고 넣어줌
public class Consultant extends User {

    @Column(name = "cslt_team")
    private String csltTeam;

    @Column(name = "cslt_exp")
    private String csltExp;

    @Column(name = "cslt_tag")
    private String csltTag;

    @Column(name = "cnslr_boundary")
    private String cnslrBoundary;
}
