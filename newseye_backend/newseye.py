from newsapi import NewsApiClient
import requests

SUMMARIZER_END_POINT="https://api.aylien.com/api/v1/summarize"
TEXT_ANALYZER_API_KEY="10f46c5ac422962c58e95633365fe91b"
TEXT_ANALYZER_APP_ID="d34c33db"

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

	def summarize(self, text):
		data = {'title':title,
        	'text':text,
        	'sentences_number':1
			}
		headers = {'Accept':'text/xml',
           'X-AYLIEN-TextAPI-Application-Key':TEXT_ANALYZER_API_KEY, 
           'X-AYLIEN-TextAPI-Application-ID':TEXT_ANALYZER_APP_ID,
			}

		r = requests.post(url=SUMMARIZER_END_POINT, data=data, headers=headers)
		result = r.text
		start = result.find('<sentence>') + len('<sentence>')
		end = result.find('</sentence>')

		return result[start:end]

