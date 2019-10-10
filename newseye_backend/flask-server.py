from flask import Flask
from newseye import Newseye
import json

app = Flask(__name__)

newseye = Newseye()

@app.route('/sources')
def index():
    return newseye.sources()

@app.route('/sources/<source_id>')
def news_from_source(source_id):
    return newseye.news(source_id)

@app.route('/news')
def news():
    return newseye.news()

@app.route('/search/<search_query>')
def search(search_query):
    return newseye.search(search_query);

@app.route('/search/<search_query>/<source_id>')
def search_source(search_query, source_id):
    return newseye.search(search_query, source_id);

@app.route('/test')
def test():
    return newseye.test()

