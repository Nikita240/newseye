from newsapi import NewsApiClient

class Newseye:
    def __init__(self):
        self.newsapi = NewsApiClient(api_key='55a335b380f54a699d4c1318ee3a6311')

    def sources(self):

        return self.newsapi.get_sources()

    def news(self, source_id=None):

        if source_id is None:
            top_headlines = self.newsapi.get_top_headlines(country='us',
                                                           language='en')
        else:
            top_headlines = self.newsapi.get_top_headlines(sources=source_id,
                                                           language='en')

        return top_headlines



