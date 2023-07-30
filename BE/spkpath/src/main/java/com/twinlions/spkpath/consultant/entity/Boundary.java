package com.twinlions.spkpath.consultant.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "boundary_tb")
@DynamicInsert
public class Boundary {

    @Id
    @Column(name = "boundary_id")
    private int boundaryId;

    @Column(name = "boundary_name")
    private String boundaryName;

    @OneToMany(mappedBy = "boundary")
    private List<ConsultantBoundary> csltBoundaries = new ArrayList<>();

    @Override
    public String toString() {
        return "Boundary{" +
                "boundaryId=" + boundaryId +
                ", boundaryName='" + boundaryName + '\'' +
                '}';
    }
}
