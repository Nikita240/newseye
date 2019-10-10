from newseye import Newseye
import json

newseye = Newseye()

def sources(event, context): 

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*"
        },
        "body": json.dumps(newseye.sources())
    }

def news(event, context):

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*"
        },
        "body": json.dumps(newseye.news())
    }

def news_from_source(event, context):

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*"
        },
        "body": json.dumps(newseye.news(event['pathParameters']['source_id']))
    }
