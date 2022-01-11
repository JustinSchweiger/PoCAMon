# This is the code
# Find me on discord ZDev1#4511
# We shouldn't install flask in the terminal, it is already imported
from flask import Flask, render_template

app = Flask(__name__)


# route
@app.route('/')
# route function
def home():
    # send 'hey!'
    return render_template('index.html')


# listen
if __name__ == "__main__":
    app.run(port=3000)
    # if you need to make it live debuging add 'debug=True'
    # app.run(port=3000, debug=True)

# Hope you enjoyed ;)