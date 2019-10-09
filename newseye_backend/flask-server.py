from flask import Flask
from newseye import Newseye

app = Flask(__name__)

newseye = Newseye()

@app.route('/sources')
def index():
    return newseye.sources()

@app.route('/sources/<source_id>')
def source(source_id):
    return newseye.news(source_id)