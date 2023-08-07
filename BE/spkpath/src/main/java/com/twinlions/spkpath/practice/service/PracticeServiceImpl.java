package com.twinlions.spkpath.practice.service;

import com.twinlions.spkpath.practice.ObjectQuestionDto;
import com.twinlions.spkpath.practice.SentenceQuestionDto;
import com.twinlions.spkpath.practice.SyllableQuestionDto;
import com.twinlions.spkpath.practice.WordQuestionDto;
import com.twinlions.spkpath.practice.config.StudyConverter;
import com.twinlions.spkpath.practice.entity.composite.StudyObject;
import com.twinlions.spkpath.practice.entity.composite.StudySentence;
import com.twinlions.spkpath.practice.entity.composite.StudySyllable;
import com.twinlions.spkpath.practice.entity.composite.StudyWord;
import com.twinlions.spkpath.practice.entity.single.ObjectEntity;
import com.twinlions.spkpath.practice.entity.single.SentenceEntity;
import com.twinlions.spkpath.practice.entity.single.SyllableEntity;
import com.twinlions.spkpath.practice.entity.single.WordEntity;
import com.twinlions.spkpath.practice.repository.*;
import com.twinlions.spkpath.practice.vo.StudyObjectVO;
import com.twinlions.spkpath.practice.vo.StudySentenceVO;
import com.twinlions.spkpath.practice.vo.StudySyllableVO;
import com.twinlions.spkpath.practice.vo.StudyWordVO;
import com.twinlions.spkpath.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PracticeServiceImpl implements PracticeService{
    private final PracticeSyllableRepository practiceSyllableRepository;
    private final PracticeObjectRepository practiceObjectRepository;
    private final PracticeSentenceRepository practiceSentenceRepository;
    private final PracticeWordRepository practiceWordRepository;
    private final StudySyllableRepository studySyllableRepository;
    private final StudyWordRepository studyWordRepository;
    private final StudyObjectRepository studyObjectRepository;
    private final StudySentenceRepository studySentenceRepository;
    private final UserRepository userRepository;
    private final StudyConverter studyConverter = new StudyConverter();

    /**
     * DB에 저장된 모든 단어를 랜덤하게 보여주는 메서드
     * @return wordEntityList
     */
    @Override
    public List<WordEntity> listAllWord() {
        List<WordEntity> list = practiceWordRepository.findAll();
        Collections.shuffle(list);
        return list;
    }

//    @Override
//    public List<ObjectEntity> listAllObject() {
//        List<ObjectEntity> list = practiceObjectRepository.findAll();
//        Collections.shuffle(list);
//        return list;
//    }

    @Override
    public List<SentenceEntity> listAllSentence() {
        List<SentenceEntity> list = practiceSentenceRepository.findAll();
        Collections.shuffle(list);
        return list;
    }

    @Override
    public List<SyllableEntity> listAllSyllable() {
        List<SyllableEntity> list = practiceSyllableRepository.findAll();
        Collections.shuffle(list);
        return list;
    }

    /**
     * 학습 중 즐겨찾기를 눌렀을 경우 실행되는 메서드
     * @param userId // 누른 사용자를 입력받는다
     * @param slbId // 누른 음절의 아이디를 입력받는다
     */
    @Transactional
    @Override
    public void saveSyllable(String userId, int slbId) {
        if(studySyllableRepository.findByUserIdAndSlbId(userRepository.findByUserId(userId).get(), practiceSyllableRepository.findBySlbId(slbId).get()).isPresent()){ // 이미 존재한다면
            studySyllableRepository.deleteByUserIdAndSlbId(userRepository.findByUserId(userId).get(), practiceSyllableRepository.findBySlbId(slbId).get()); // 삭제
        }else{ // 기존에 저장하지 않았다면
            StudySyllable studySyllable = StudySyllable.builder()
                    .userId(userRepository.findByUserId(userId).get())
                    .slbId(practiceSyllableRepository.findBySlbId(slbId).get())
                    .build();
            studySyllableRepository.save(studySyllable);
        }
    }

    @Transactional
    @Override
    public void saveWord(String userId, int wordId) {
        if(studyWordRepository.findByUserIdAndWordId(userRepository.findByUserId(userId).get(), practiceWordRepository.findByWordId(wordId).get()).isPresent()){ // 이미 존재한다면
            studyWordRepository.deleteByUserIdAndWordId(userRepository.findByUserId(userId).get(), practiceWordRepository.findByWordId(wordId).get()); // 삭제
        }else{ // 기존에 저장하지 않았다면
            StudyWord studyWord = StudyWord.builder()
                    .userId(userRepository.findByUserId(userId).get())
                    .wordId(practiceWordRepository.findByWordId(wordId).get())
                    .build();
            studyWordRepository.save(studyWord);
        }
    }

    @Transactional
    @Override
    public void saveSentence(String userId, int stcId) {
        if(studySentenceRepository.findByUserIdAndStcId(userRepository.findByUserId(userId).get(), practiceSentenceRepository.findByStcId(stcId).get()).isPresent()){ // 이미 존재한다면
            studySentenceRepository.deleteByUserIdAndStcId(userRepository.findByUserId(userId).get(), practiceSentenceRepository.findByStcId(stcId).get()); // 삭제
        }else{ // 기존에 저장하지 않았다면
            StudySentence studySentence = StudySentence.builder()
                    .userId(userRepository.findByUserId(userId).get())
                    .stcId(practiceSentenceRepository.findByStcId(stcId).get())
                    .build();
            studySentenceRepository.save(studySentence);
        }
    }

    @Transactional
    @Override
    public void saveObject(String userId, int objId) {
        if(studyObjectRepository.findByUserIdAndObjId(userRepository.findByUserId(userId).get(), practiceObjectRepository.findByObjId(objId).get()).isPresent()){ // 이미 존재한다면
            studyObjectRepository.deleteByUserIdAndObjId(userRepository.findByUserId(userId).get(), practiceObjectRepository.findByObjId(objId).get()); // 삭제
        }else{ // 기존에 저장하지 않았다면
            StudyObject studyObject = StudyObject.builder()
                    .userId(userRepository.findByUserId(userId).get())
                    .objId(practiceObjectRepository.findByObjId(objId).get())
                    .build();
            studyObjectRepository.save(studyObject);
        }
    }

    /**
     * 마이페이지에서 사용자가 저장한 음절 목록을 조회하는 메서드
     * @param userId // 누른 사용자를 입력받는다
     */
    @Override
    public List<StudySyllableVO> showMySyllable(String userId) {
        List<StudySyllable> list = studySyllableRepository
                .findByUserId(userRepository.findByUserId(userId).get()).get();
        return list.stream()
                .map(studyConverter::syllableToSyllableVO)
                .collect(Collectors.toList());
    }

    @Override
    public List<StudyWordVO> showMyWord(String userId) {
        List<StudyWord> list = studyWordRepository
                .findByUserId(userRepository.findByUserId(userId).get()).get();
        return list.stream()
                .map(studyConverter::wordToWordVO)
                .collect(Collectors.toList());
    }

    @Override
    public List<StudySentenceVO> showMySentence(String userId) {
        List<StudySentence> list = studySentenceRepository
                .findByUserId(userRepository.findByUserId(userId).get()).get();
        return list.stream()
                .map(studyConverter::sentenceToSentenceVO)
                .collect(Collectors.toList());
    }

    @Override
    public List<StudyObjectVO> showMyObject(String userId) {
        List<StudyObject> list = studyObjectRepository
                .findByUserId(userRepository.findByUserId(userId).get()).get();
        return list.stream()
                .map(studyConverter::objectToObjectVO)
                .collect(Collectors.toList());
    }

    /**
     * 학습 시작 시 문제를 생성하는 메서드
     * @param userId // 누른 사용자를 입력받는다
     * @param questionSize // 생성할 문제 수를 입력받는다
     */
    @Override
    public SyllableQuestionDto makeSyllableQuestions(String userId, int questionSize) {
        List<SyllableEntity> questionList = new ArrayList<>();
        List<Boolean> savedList = new ArrayList<>();
        List<Integer> nList = GenerateRandomNum(questionSize, practiceSyllableRepository.count());

        for (int i = 0; i < questionSize; i++) {
            int item = nList.get(i);
            questionList.add(practiceSyllableRepository.findBySlbId(item).get());
            if (studySyllableRepository
                    .findByUserIdAndSlbId(userRepository.findByUserId(userId).get(),
                            practiceSyllableRepository.findBySlbId(item).get()).isPresent()) {
                savedList.add(true);
            } else savedList.add(false);
        }

        return new SyllableQuestionDto(questionList, savedList);
    }

    @Override
    public WordQuestionDto makeWordQuestions(String userId, int questionSize) {
        List<WordEntity> questionList = new ArrayList<>();
        List<Boolean> savedList = new ArrayList<>();
        List<Integer> nList = GenerateRandomNum(questionSize, practiceWordRepository.count());

        for (int i = 0; i < questionSize; i++) {
            int item = nList.get(i);
            questionList.add(practiceWordRepository.findByWordId(item).get());
            if (studyWordRepository
                    .findByUserIdAndWordId(userRepository.findByUserId(userId).get(),
                            practiceWordRepository.findByWordId(item).get()).isPresent()) {
                savedList.add(true);
            } else savedList.add(false);
        }

        return new WordQuestionDto(questionList, savedList);
    }

    @Override
    public SentenceQuestionDto makeSentenceQuestions(String userId, int questionSize) {
        List<SentenceEntity> questionList = new ArrayList<>();
        List<Boolean> savedList = new ArrayList<>();
        List<Integer> nList = GenerateRandomNum(questionSize, practiceSentenceRepository.count());

        for (int i = 0; i < questionSize; i++) {
            int item = nList.get(i);
            questionList.add(practiceSentenceRepository.findByStcId(item).get());
            if (studySentenceRepository
                    .findByUserIdAndStcId(userRepository.findByUserId(userId).get(),
                            practiceSentenceRepository.findByStcId(item).get()).isPresent()) {
                savedList.add(true);
            } else savedList.add(false);
        }

        return new SentenceQuestionDto(questionList, savedList);
    }

    @Override
    public ObjectQuestionDto makeObjectQuestions(String userId, int questionSize) {
        // 잘못된 선택지의 수
        int wrongChoice = 3 * questionSize;

        // 전체 답안
        List<ObjectEntity> answerList = new ArrayList<>();

        // 사용자의 답안 저장 여부
        List<Boolean> savedList = new ArrayList<>();

        int objectSize = practiceObjectRepository.count();
        System.out.println(objectSize);
        // 랜덤 난수 생성 리스트
        List<Integer> nList = GenerateRandomNum(questionSize, objectSize);

        // 답안 리스트 완성 -- size = questionSize
        int idx = 0, num;
        for (int i = 0; i < questionSize; i++) {
            int item = nList.get(idx++);
            answerList.add(practiceObjectRepository.findByObjId(item).get());
            if (studyObjectRepository
                    .findByUserIdAndObjId(userRepository.findByUserId(userId).get(),
                            practiceObjectRepository.findByObjId(item).get())
                    .isPresent()) {
                savedList.add(true);
            } else savedList.add(false);
            if (idx == objectSize) {
                Collections.shuffle(nList);
                idx = 0;
            }
        }

        // 문제 리스트 생성
        List<List<ObjectEntity>> questionList = new ArrayList<>();
        for (int i = 0; i < questionSize; i++) {
            questionList.add(new ArrayList<>());
            questionList.get(i).add(answerList.get(i));
        }

        idx = 0;
        Collections.shuffle(nList);
        Queue<Integer> nQueue = new ArrayDeque<>(nList);
        while (wrongChoice > 0) {
            while ((num = nQueue.poll()) == answerList.get(idx).getObjId() || nQueue.size() == 0) {
                if (nQueue.size() == 0) {
                    Collections.shuffle(nList);
                    nQueue.addAll(nList);
                }
            }
            questionList.get(idx).add(practiceObjectRepository.findByObjId(num).get());
            wrongChoice--;
            if (wrongChoice % 3 == 0) {
                Collections.shuffle(questionList.get(idx++));
            }
        }

        return new ObjectQuestionDto(questionList, answerList, savedList);
    }

    public boolean isSavedObject(String userId, int objId) {
        if (studyObjectRepository.findByUserIdAndObjId(userRepository.findByUserId(userId).get(),
                practiceObjectRepository.findByObjId(objId).get()).isPresent()) {
            return true;
        } else return false;
    }

    /**
     * 랜덤 난수를 생성하는 메서드
     * @param size // 만들 난수의 수를 입력받는다
     * @param candidateSize // 난수의 범위를 입력받는다(1 <= N <= candidateSize)
     */
    private List<Integer> GenerateRandomNum(int size, int candidateSize) {
        List<Integer> nList = new ArrayList<>();

        for (int i = 1; i <= candidateSize; i++) {
            nList.add(i);
        }
        Collections.shuffle(nList);
        return nList.subList(0, size);
    }
}
