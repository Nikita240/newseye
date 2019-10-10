from newsapi import NewsApiClient
import requests
from newsplease import NewsPlease
import json
import elasticache_auto_discovery
from pymemcache.client.hash import HashClient

SUMMARIZER_END_POINT="https://api.aylien.com/api/v1/summarize"
TEXT_ANALYZER_API_KEY="10f46c5ac422962c58e95633365fe91b"
TEXT_ANALYZER_APP_ID="d34c33db"

#elasticache settings
elasticache_config_endpoint = "news-cache.sjxgb8.cfg.usw2.cache.amazonaws.com:11211"
nodes = elasticache_auto_discovery.discover(elasticache_config_endpoint)
nodes = map(lambda x: (x[1], int(x[2])), nodes)
memcache_client = HashClient(nodes)

newsapi = NewsApiClient(api_key='55a335b380f54a699d4c1318ee3a6311')

WATSON_TOKEN="Basic YXBpa2V5OnNOX0JMZlN5YnpocVY5TjVSbk5NVnJDVUs2M21JLTFBejdob3dsdk5VSS0z"
WATSON_URL="https://gateway.watsonplatform.net/visual-recognition/api/v3"

def news(source_id=None):

    if source_id is None:
        articles = newsapi.get_top_headlines(country='us',
                                                        language='en',
                                                        page_size=10)
    else:
        articles = newsapi.get_top_headlines(sources=source_id,
                                                        language='en',
                                                        page_size=10)

    for article in articles['articles']:
        img_url = article['urlToImage']
        path = WATSON_URL + '/classify?url=' + img_url + '&version=2018-03-19&classifier_ids=default'
        headers = {'Authorization':WATSON_TOKEN}

        response = requests.get(path, headers=headers)
        results = json.loads(response.text)
        features = results['images'][0]['classifiers'][0]['classes']
        filtered_results = list(filter(lambda x: 'color' not in x['class'] and 'person' not in x['class'], features))
        sorted_results = sorted(filtered_results, key = lambda x: x['score'], reverse = True)[:3]

        classes = []
        for result in sorted_results:
            classes.append(result['class'])

        article['summary'] = get_summary(article['url'])
        article['img_classes'] = classes

    return articles

def search(search_query, source_id=None):
    if source_id is None:
        articles = newsapi.get_top_headlines(q=search_query,
                                                       country='us',
                                                       language='en',
                                                       page_size=10)
    else:
        articles = newsapi.get_top_headlines(q=search_query,
                                                       sources=source_id,
                                                       language='en',
                                                       page_size=10)
    return articles

def get_summary(url):
    summary = memcache_client.get(url)

    if (summary):
        return summary

    summary = summarize(url)

    memcache_client.set(url, summary)

    return summary

def summarize(url):

    article = NewsPlease.from_url(url)

    data = {
        'title': article.title,
        'text': article.text,
        'sentences_number': 1
    }
    headers = {
        'Accept':'text/xml',
        'X-AYLIEN-TextAPI-Application-Key':TEXT_ANALYZER_API_KEY, 
        'X-AYLIEN-TextAPI-Application-ID':TEXT_ANALYZER_APP_ID,
    }

    r = requests.post(url=SUMMARIZER_END_POINT, data=data, headers=headers)
    result = r.text
    start = result.find('<sentence>') + len('<sentence>')
    end = result.find('</sentence>')

    return result[start:end]

