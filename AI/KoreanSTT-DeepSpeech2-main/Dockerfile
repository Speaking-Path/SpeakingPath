FROM pytorch/pytorch:1.7.0-cuda11.0-cudnn8-runtime
FROM python:3.9

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . /app/stt

WORKDIR /app/stt


RUN apt-get update -y && apt-get install -y --no-install-recommends build-essential gcc \
                                        libsndfile1
RUN pip install --upgrade pip
RUN pip install --trusted-host pypi.python.org -r requirements.txt

RUN apt-get install -y ffmpeg

EXPOSE 80


CMD ["python", "app.py"]