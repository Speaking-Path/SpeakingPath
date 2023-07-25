package com.twinlions.spkpath.consultant.entity;

import com.twinlions.spkpath.user.entity.User;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter // Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "consultant_info_tb") // consultant_info_tb와 매칭
@DynamicInsert // Null 인 것은 자동으로 제외하고 넣어줌
public class Consultant extends User {

    @Column(name = "cslt_team", nullable = false)
    private String csltTeam;

    @Column(name = "cslt_exp", nullable = false)
    private int csltExp;

    @Column(name = "cslt_tag", nullable = false)
    private String csltTag;

    @OrderColumn(name = "cslt_boundary", nullable = false)
    private String csltBoundary;
}
