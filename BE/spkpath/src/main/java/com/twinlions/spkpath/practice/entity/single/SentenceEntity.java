package com.twinlions.spkpath.practice.entity.single;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sentence_tb")
public class SentenceEntity {
    @Id
    @Column(name = "stc_id")
    private int stcId;

    @Column(name = "stc_content", nullable = false)
    private String stcContent;
}
