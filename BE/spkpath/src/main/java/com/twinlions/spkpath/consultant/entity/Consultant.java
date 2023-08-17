package com.twinlions.spkpath.consultant.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    @OneToMany(mappedBy = "cslt")
    private List<ConsultantTag> csltTags = new ArrayList<>();

    @OneToMany(mappedBy = "cslt")
    private List<ConsultantBoundary> csltBoundaries = new ArrayList<>();

    @Override
    public String toString() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            // JSON 변환에 실패한 경우, 예외 처리 필요
            e.printStackTrace();
            return "JSON conversion failed for Consultant";
        }
    }
}
