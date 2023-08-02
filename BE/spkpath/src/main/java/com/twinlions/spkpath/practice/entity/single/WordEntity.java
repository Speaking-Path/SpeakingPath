package com.twinlions.spkpath.practice.entity.single;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Table(name = "word_tb")
public class WordEntity {
    @Id
    @Column(name = "word_id")
    private int wordId;

    @Column(name = "word_content", nullable = false)
    private String wordContent;

    @Column(name = "word_pron")
    private String wordPron;
}