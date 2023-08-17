# KoreanSTT-DeepSpeech2

## 1. Introduction

본 프로젝트는 실시간 한국어 음성 인식기능을 제공합니다.  

Speech to Text (STT)와 관련한 모든 전처리, 모델, 학습 등은 [sooftware](https://github.com/sooftware)님께서 공유해주신 [Kospeech](https://github.com/sooftware/kospeech) 오픈소스를 사용했습니다.

본 프로젝트는 Kospeech를 기반으로 한 pre-trained 모델을 제공하며, 실시간으로 마이크를 통해 음성 데이터를 받아들이고 해당 음성에 대한 인식 결과를 텍스트로 제공합니다.

다른 데이터셋과 다른 모델을 이용하여 직접 모델을 학습시켜보고 싶으신 분들께서는 [sooftware님의 Kospeech 오픈소스 링크](https://github.com/sooftware/kospeech)에서 더욱 자세한 정보를 얻으실 수 있습니다 :)

## 2. Pre-trained Model

**Model**: DeepSpeech2  
**Dataset**: KsponSpeech  

**Training**  
Google Colab Pro

**Performance**  
CER : ***

## 3. How to use?

### Prerequisites
This model is run by Flask and Docker image.


### Inference with pretrained Model
1. Download model.pt (you must contact one of project members)

2. Build Docker image

3. Run docker container

4. You can check by your own server

## 4. Troubleshoots and Contributing

본 프로젝트와 관련된 Issue 등 개선사항은 개발자 중 한명에게 연락주시면 답변해드립니다.

```Anyone can contribute to this repo! Welcome! ```
