import json
from news import sources
from news import news
from news import search

def get_sources(event, context): 

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*"
        },
        "body": json.dumps(sources())
    }

def get_news(event, context):

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*"
        },
        "body": json.dumps(news())
    }

def get_news_from_source(event, context):

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*"
        },
        "body": json.dumps(news(event['pathParameters']['source_id']))
    }

def get_search(event, context):

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*"
        },
        "body": json.dumps(search(event['pathParameters']['search_query'], checkPath(event['pathParameters'])))
    }

def checkPath(pathParameters):
    if 'source_id' in pathParameters.keys():
        return pathParameters['source_id']
    else:
        return None
