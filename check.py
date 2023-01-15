from fastai.vision.all import *
import pathlib
from PIL import Image

pathlib.PosixPath = pathlib.WindowsPath
# image = pathlib.Path("test.png")
image = Image.open("test.png").convert("RGB")
model = load_learner("model.pkl")
prediction, idx, confidence = model.predict(image)

