import cv2
import yolov5
import numpy as np
import json
import random
from flask import Flask, render_template, Response
from flask_socketio import SocketIO
from flask_cors import CORS, cross_origin
from torch import Tensor

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)
socketio = SocketIO(app, always_connect=True)
camera = cv2.VideoCapture(0)
model = yolov5.load('model.pt')
pokemonList = json.load(open('data.json', mode='r', encoding='utf-8'))


def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            yolo_detection(frame)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


def yolo_detection(image):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = model(image)
    detected_classes = set()

    for pred in results.pred:
        for p in np.asarray(Tensor.cpu(pred)):
            class_id = int(p[-1])
            class_name = results.names[class_id]
            detected_classes.add(class_name)

    socketio.emit('detected_pokemon', sorted(detected_classes))


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/webcam')
def webcam():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/pokemon')
@cross_origin()
def pokemon():
    rand = random.randint(0, len(pokemonList) - 1)
    return pokemonList[rand]


if __name__ == "__main__":
    socketio.run(app)
