package com.twinlions.spkpath.consultant.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter // Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "tag_tb") // consultant_info_tb와 매칭
@DynamicInsert // Null 인 것은 자동으로 제외하고 넣어줌
public class Tag {

    @Id
    @Column(name = "tag_id")
    private String tagId;

    @Column(name = "tag_name", nullable = false)
    private String tagName;
}
