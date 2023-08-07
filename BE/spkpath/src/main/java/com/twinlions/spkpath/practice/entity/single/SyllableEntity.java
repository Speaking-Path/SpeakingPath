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
@Table(name = "syllable_tb")
public class SyllableEntity {
    @Id
    @Column(name = "slb_id")
    private int slbId;

    @Column(name = "slb_content", nullable = false)
    private String slbContent;
}
