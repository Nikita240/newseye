from flask import Flask
from newseye import Newseye
import json

app = Flask(__name__)

newseye = Newseye()

@app.route('/sources')
def index():
    return newseye.sources()

@app.route('/sources/<source_id>/news')
def news_from_source(source_id):
    return newseye.news(source_id)

@app.route('/news')
def news():
    return newseye.news()

@app.route('/test')
def test():
    return newseye.test()