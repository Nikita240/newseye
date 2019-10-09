from flask import Flask
from newsapi import NewsApiClient

app = Flask(__name__)

newsapi = NewsApiClient(api_key='55a335b380f54a699d4c1318ee3a6311')

@app.route("/sources")
def sources():

    return newsapi.get_sources()

@app.route("/sources/<source_id>")
def news(source_id):

    top_headlines = newsapi.get_top_headlines(sources=source_id,
                                              language='en')

    return top_headlines