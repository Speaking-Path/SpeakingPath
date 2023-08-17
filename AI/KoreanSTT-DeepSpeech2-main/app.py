# -*- coding: utf-8 -*-
"""
Created on Wed Feb 23 17:23:57 2022

@author: user
"""

from flask import Flask, request, render_template, jsonify
from flask import render_template
from flask_cors import CORS  # Flask-CORS import
import evaluate
import base64
# import os
import socket
import pathlib
import whisper
import wave
import librosa

app = Flask(__name__)
CORS(app)  # CORS 설정

def pcm_to_wav(pcm_file, wav_file, channels=1, sample_width=2, frame_rate=16000):
    """
    PCM 파일을 WAV 파일로 변환하는 함수

    Args:
        pcm_file (str): 입력 PCM 파일 경로
        wav_file (str): 출력 WAV 파일 경로
        channels (int): 오디오 채널 수 (기본값은 1)
        sample_width (int): 오디오 샘플 넓이(바이트) (기본값은 2)
        frame_rate (int): 샘플링 주파수 (기본값은 44100Hz)

    Returns:
        None
    """
    with open(pcm_file, 'rb') as pcm:
        pcm_data = pcm.read()

    with wave.open(wav_file, 'wb') as wav:
        wav.setnchannels(channels)
        wav.setsampwidth(sample_width)
        wav.setframerate(frame_rate)
        wav.writeframes(pcm_data)

@app.route("/stt/whisper", methods=['GET', 'POST'])
def myWhisper():
    if request.method == 'POST':
        try:
            print('start')
            pcm_file_path = request.json.get('file')
            answer = request.json.get('answer')
            wav_file_path = "pcmToWav.wav"
            print('middle')
            # audio_data = base64.b64decode(pcm_file_path)
            # with open("audio.pcm", "wb") as audio_file:
            #     audio_file.write(audio_data)

            #
            # pcm_to_wav(audio_file, wav_file_path)
            # print('after pcm to wav')
            model = whisper.load_model("base")

            # load audio and pad/trim it to fit 30 seconds
            audio = whisper.load_audio(pcm_file_path)
            print('end model')
            audio = whisper.pad_or_trim(audio)

            # make log-Mel spectrogram and move to the same device as the model
            mel = whisper.log_mel_spectrogram(audio).to(model.device)

            # decode the audio
            options = whisper.DecodingOptions(fp16=False)
            result = whisper.decode(model, mel, options)

            denominator = len(answer)
            numerator = 0

            # 정답이랑 일치율 비교
            for char in answer:
                if char in result.text: numerator += 1

            accuracy = numerator / denominator

            # print the recognized text
            sendingMsg = {"predict": result.text, "accuracy":accuracy}
            return jsonify(sendingMsg)
        except Exception as e:
            print("Error:", str(e))
            return jsonify({"error": "An error occurred"}), 500
    return jsonify('Unauthorized', 401)

# try:
#
#     if not os.path.exists('./test_files/'):
#         os.makedirs('./test_files/')
# except OSError:
#     print("Error: Failed to create the directory.")


@app.route("/stt", methods=['GET', 'POST'])
def uploads():
    return render_template('test.html', transcript="데이터를 업로드 해주세요")


@app.route("/stt/result", methods=['GET', 'POST'])
def results():
    if request.method == 'POST':
        try:
            # Decode Base64 audio data
            base64_audio = request.json.get('file')
            answer = request.json.get('answer')
            audio_data = base64.b64decode(base64_audio)

            # Save the audio data as a file (if needed)
            with open("audio.pcm", "wb") as audio_file:
                audio_file.write(audio_data)

            # Process the audio data using the evaluate.mains function
            predict = evaluate.mains(audio_data)

            denominator = len(answer)
            numerator = 0

            # 정답이랑 일치율 비교
            for char in answer:
                if char in predict: numerator+=1

            accuracy = numerator/denominator
            result = "fail"
            if accuracy > 0.49:
                result = "success"
            response = {"predict": predict, "accuracy": accuracy, "result": result}

            return jsonify(response)

        except Exception as e:
            print("Error:", str(e))
            return jsonify({"error": "An error occurred"}), 500
    return jsonify('Unauthorized', 401)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)