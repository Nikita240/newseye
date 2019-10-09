from newsapi import NewsApiClient
from gensim.summarization.summarizer import summarize

class Newseye:
    def __init__(self):
        self.newsapi = NewsApiClient(api_key='55a335b380f54a699d4c1318ee3a6311')

    def sources(self):

        return self.newsapi.get_sources()

    def news(self, source_id):

        top_headlines = self.newsapi.get_top_headlines(sources=source_id,
                                                language='en')

        return top_headlines

''' Returns summary of text. pct determines the proportion of the number of sentences of the original text to be chosen for the summary. '''    
    def summarize(self, text, pct):
        summary = summarize(text,ratio=pct,split=False);
        return summary;



