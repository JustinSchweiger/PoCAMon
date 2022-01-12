import base64
from io import BytesIO

import cv2
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import yolov5
from PIL import Image
import numpy as np

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, always_connect=True)
model = yolov5.load('model.pt')

@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('webcam-feed')
def webcam_feed(image):
    im = Image.open(base64.b64decode(image))
    im.save('image.png', 'PNG')
    """im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    print(img)
    results = model(img)
    detected_classes = set()
    for pred in results.pred:
        for p in np.asarray(pred):
            class_id = int(p[-1])
            class_name = results.names[class_id]
            detected_classes.add(class_name)

    emit('result', str(sorted(detected_classes)))"""

if __name__ == "__main__":
    socketio.run(app)
