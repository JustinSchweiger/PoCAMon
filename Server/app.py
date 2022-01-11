from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('my event')
def my_test_emit(message):
    emit('my test', {'data': 'got it!'})


@socketio.on('connect')
def test_connect():
    emit('my response', {'data': 'Connected'})


if __name__ == "__main__":
    socketio.run(app)
