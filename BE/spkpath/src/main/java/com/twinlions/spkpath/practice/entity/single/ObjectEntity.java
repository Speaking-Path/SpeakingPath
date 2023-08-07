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
@Table(name = "object_tb")
public class ObjectEntity {
    @Id
    @Column(name = "obj_id")
    private int objId;

    @Column(name = "obj_name", nullable = false)
    private String objName;

    @Column(name = "obj_pic", nullable = false)
    private String objPic;
}

