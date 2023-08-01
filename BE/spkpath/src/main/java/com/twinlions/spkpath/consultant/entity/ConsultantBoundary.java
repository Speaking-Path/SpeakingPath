package com.twinlions.spkpath.consultant.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "consultant_boundary_tb")
public class ConsultantBoundary {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int Id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Consultant cslt;

    @ManyToOne
    @JoinColumn(name = "boundary_id")
    private Boundary boundary;

}
