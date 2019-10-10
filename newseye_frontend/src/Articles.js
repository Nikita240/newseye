import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import {Button, Flex, Image, Header, Text} from "@stardust-ui/react";
import './App.css';
import NewsRestClient from './NewsRestClient';
import WatsonRestClient from './WatsonRestClient';

export const Articles = withRouter(({ history }, props) => {
  
  const initialArticlesState = {
    articles: []
  };

  const [articles, setArticles] = useState(initialArticlesState);

  useEffect(() => {
    const client = new NewsRestClient();
    const getArticles = async () => {
      // Pass our param (:id) to the API call
      const currentPath = history.location.pathname.split('/');
      const sourceId = currentPath[currentPath.length - 1];
      const {articles} = await client.getArticlesBySource(sourceId);
      const newArticles = [];
      await asyncForEach(articles, async article => {
        const card = await getArticleCard(article.title, article.url, article.urlToImage, article.source.nam, history);
        newArticles.push(card);
      });
      console.log(JSON.stringify(newArticles));
      setArticles({articles: newArticles});
    }

    // Invoke the async function
    getArticles()
  }, [history]);
  return (
    <Flex
        className="Articles" 
        column
        style={{
          padding: "2vh",
          overflow: "scroll"
        }}
      >
      <div tabIndex={0} aria-label={"Please select which news sources to read articles from"}>
        <Header 
          styles={{
            textAlign: "left"
          }}
          content="News Articles" 
          description="Select which article you would like to read" color={"yellow"} 
        />
      </div>
      {articles.articles}
    </Flex>
  );
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
}

async function getArticleCard(title, url, imageUrl, sourceName, history){
  const watsonClient = new WatsonRestClient();
  const featureBag = await watsonClient.getImageFeatures(imageUrl).then(response => {

    const features = response.images[0].classifiers[0].classes
    features.sort((a,b) => {
      return b.score - a.score;
    }).slice(0,3);
    const importantFeatures = [];
    features.forEach(feature => importantFeatures.push(feature.class));
    return importantFeatures;
  });
  
  console.log(JSON.stringify(featureBag));

  const content = (
    <Flex styles={{width: "100vh"}}gap="gap.medium" padding="padding.medium" debug>
      <Flex.Item size="size.medium">
        <div
          style={{
            position: 'relative',
          }}
        >
          <Image fluid src={imageUrl} />
        </div>
      </Flex.Item>
      <Flex.Item grow>
        <Flex column gap="gap.small" vAlign="stretch">
          <Flex space="between">
            <Header as="h3" content={title} />
          </Flex>
          <Text content={sourceName} />
        </Flex>
      </Flex.Item>
    </Flex>
  );

  return (
    <Button
      key={"article_" + url}
      styles={{maxWidth: "100%", height:"10vh"}}
      content={content}
      onClick={() => { window.location.href = url; }}
    >
    </Button>
  );
}

export default Articles;