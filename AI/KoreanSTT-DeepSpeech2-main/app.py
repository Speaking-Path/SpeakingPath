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

# try:
#
#     if not os.path.exists('./test_files/'):
#         os.makedirs('./test_files/')
# except OSError:
#     print("Error: Failed to create the directory.")
app = Flask(__name__)
CORS(app)  # CORS 설정

@app.route("/stt", methods=['GET', 'POST'])
def uploads():
    return render_template('test.html', transcript="데이터를 업로드 해주세요")


@app.route("/stt/result", methods=['GET', 'POST'])
def results():
    if request.method == 'POST':
        # # file = request.form.get('file')
        # f = request.files['file']
        # # f.save('./test_files/'+f.filename) // 파일 바로 평가하는 거 안되면 저장하고 써야해
        #
        # predict = evaluate.mains(f)
        # # predict = evaluate.mains('./test_files/' + f.filename)
        #
        # # prediction = model.model_classification(path_+"\\testdata\\"+f.filename)
        # # return render_template('index.html', label=label)
        # # return render_template('test2.html', filename =f.filename, transcript=predict[0])
        # response = {"result": predict[0]}
        # return jsonify(response)
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

            denominator = answer.length
            numerator = 0

            # 정답이랑 일치율 비교
            for char in answer:
                if char in predict: numerator+=1

            accuracy = numerator/denominator
            result = "fail"
            if accuracy > 0.5:
                result = "success"
            response = {"predict": predict, "accuracy": numerator/denominator, "result": result}

            return jsonify(response)

        except Exception as e:
            print("Error:", str(e))
            return jsonify({"error": "An error occurred"}), 500
    return jsonify('Unauthorized', 401)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)