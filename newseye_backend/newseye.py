from flask import Flask
from newsapi import NewsApiClient

app = Flask(__name__)

@app.route("/")
def news():
    newsapi = NewsApiClient(api_key='55a335b380f54a699d4c1318ee3a6311')

    top_headlines = newsapi.get_top_headlines(language='en',
                                              country='us')

    return top_headlines