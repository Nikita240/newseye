from flask import Flask
from news import sources
from news import news
from news import search
import json

app = Flask(__name__)

@app.route('/sources')
def index():
    return sources()

@app.route('/sources/<source_id>')
def news_from_source(source_id):
    return news(source_id)

@app.route('/news')
def all_news():
    return news()

@app.route('/search/<search_query>')
def simple_search(search_query):
    return search(search_query);

@app.route('/search/<search_query>/<source_id>')
def search_source(search_query, source_id):
    return search(search_query, source_id);
