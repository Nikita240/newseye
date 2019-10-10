from newsapi import NewsApiClient

newsapi = NewsApiClient(api_key='55a335b380f54a699d4c1318ee3a6311')

def sources():

    return newsapi.get_sources()