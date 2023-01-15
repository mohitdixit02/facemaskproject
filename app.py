from flask import Flask, request
from flask import render_template
from fastai.vision.all import *
import base64
import pathlib

app = Flask(__name__)
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/request/', methods=['POST'])
def datafn():
    data = request.data
    image_code = base64.b64decode(data)
    pathlib.PosixPath = pathlib.WindowsPath

    with open("file.png", "wb") as f:
        f.write(image_code)


    model = load_learner("model.pkl")
    prediction, idx, confidence = model.predict("file.png")
    return {
        'prediction': prediction
    }