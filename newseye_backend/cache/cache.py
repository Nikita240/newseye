import json
import elasticache_auto_discovery
from pymemcache.client.hash import HashClient

#elasticache settings
elasticache_config_endpoint = "news-cache.sjxgb8.cfg.usw2.cache.amazonaws.com:11211"
nodes = elasticache_auto_discovery.discover(elasticache_config_endpoint)
nodes = map(lambda x: (x[1], int(x[2])), nodes)
memcache_client = HashClient(nodes)

def lambda_handler(event, context):
    
    summary = memcache_client.get('url')
    
    if (summary):
        return {
            'statusCode': 200,
            'body': summary
        } 
        
    
    return {
        'statusCode': 200,
        'body': "test"
    }