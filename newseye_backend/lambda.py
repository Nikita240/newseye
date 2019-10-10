import json
from sources import sources
from news import news

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
