from flask import Flask
from news import sources
from news import news
import json

app = Flask(__name__)

@app.route('/sources')
def index():
    return sources()

@app.route('/sources/<source_id>/news')
def news_from_source(source_id):
    return news(source_id)

@app.route('/news')
def all_news():
    return news()

# @app.route('/test')
# def test():
#     return newseye.test()