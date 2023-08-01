package com.twinlions.spkpath.practice.service;

import com.twinlions.spkpath.practice.entity.single.ObjectEntity;
import com.twinlions.spkpath.practice.entity.single.SentenceEntity;
import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import com.twinlions.spkpath.practice.entity.single.WordEntity;
import com.twinlions.spkpath.practice.repository.PracticeObjectRepository;
import com.twinlions.spkpath.practice.repository.PracticeSentenceRepository;
import com.twinlions.spkpath.practice.repository.PracticeSyllableRepository;
import com.twinlions.spkpath.practice.repository.PracticeWordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PracticeServiceImpl implements PracticeService{
    private final PracticeSyllableRepository practiceSyllableRepository;
    private final PracticeObjectRepository practiceObjectRepository;
    private final PracticeSentenceRepository practiceSentenceRepository;
    private final PracticeWordRepository practiceWordRepository;

    @Override
    public List<WordEntity> listAllWord() {
        return practiceWordRepository.findAll();
    }

    @Override
    public List<ObjectEntity> listAllObject() {
        return practiceObjectRepository.findAll();
    }

    @Override
    public List<SentenceEntity> listAllSentence() {
        return practiceSentenceRepository.findAll();
    }

    @Override
    public List<SyllableEntity> listAllSyllable() {
        return practiceSyllableRepository.findAll();
    }
}
