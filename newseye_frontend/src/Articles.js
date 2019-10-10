import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { AutoFocusZone, Box, Button, Flex, Image, Header, Text, Grid, Loader } from "@stardust-ui/react";
import './App.css';
import NewsRestClient from './NewsRestClient';

export const Articles = withRouter(({ history }, props) => {
  
  const initialArticlesState = {
    articles: []
  };

  const [articles, setArticles] = useState(initialArticlesState);

  useEffect(() => {
    const client = new NewsRestClient();
    const getArticles = async () => {
      const currentPath = history.location.pathname.split('/');
      if (history.location.pathname.indexOf('search') > 0) {
        if (currentPath.length > 3) {
          const selectedSourceId = currentPath[currentPath.length - 1]
          const searchQuery = currentPath[currentPath.length - 2];
          const {articles} = await client.getArticlesBySearch(searchQuery, selectedSourceId);
          const newArticles = [];
          await asyncForEach(articles, async article => {
            const card = await getArticleCard(article.title, article.url, article.urlToImage, article.source.name, article.img_classes, article.summary, history);
            newArticles.push(card);
          });
          setArticles({articles: newArticles});
        } else {
          const searchQuery = currentPath[currentPath.length - 1];
          const {articles} = await client.getArticlesBySearch(searchQuery);
          const newArticles = [];
          await asyncForEach(articles, async article => {
            const card = await getArticleCard(article.title, article.url, article.urlToImage, article.source.name, article.img_classes, article.summary, history);
            newArticles.push(card);
          });
          setArticles({articles: newArticles});
        }
        
      } else {
        const sourceId = currentPath[currentPath.length - 1];
        const {articles} = await client.getArticlesBySource(sourceId);
        const newArticles = [];
        await asyncForEach(articles, async article => {
          const card = await getArticleCard(article.title, article.url, article.urlToImage, article.source.name, article.img_classes, article.summary, history);
          newArticles.push(card);
        });
        setArticles({articles: newArticles});
      }
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
      <div tabIndex={0} aria-label={"Please select which news articles to read. Press tab to step into the grid. The first tab per item will select the title, the second the summary, and the third a description of the image"}>
        <Header 
          styles={{
            textAlign: "left"
          }}
          content="News Articles" 
          description="Select which article you would like to read" color={"yellow"} 
        />
      </div>
      {articles.articles.length > 0 ? <div>
        <AutoFocusZone><Grid content={articles.articles} columns={2}/></AutoFocusZone>
      </div> : <Loader role={"alert"} aria-label={"Loading results..."} label={"Loading results..."}/>}
    </Flex>
  );
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
}

async function getArticleCard(title, url, imageUrl, sourceName, imageClasses, summary, history){
  return (
    <Box 
      key={"article_box_" + url}
      styles={{height:"20vh", width: "90vh", margin:"1px", border: "coral 1px solid", boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.2rem 0.4rem -0.075rem"}}>
      <Button
        key={"article_" + url}
        styles={{maxWidth: "100%", width: "70%", height:"20vh", float: "left", border: "none", boxShadow: "none"}}
        content={<Text content={title} />}
        onClick={() => { window.location.href = url; }}
      >
      </Button>
      <Text tabIndex={0} styles={{height:"20vh", position:"fixed", color: "transparent", outline: "none"}} content={"Article summary: " + summary}></Text>
      <Image styles={{height:"19.5vh", maxWidth: "29%", objectFit: "scale-down", zIndex: -1, float: "right"}} src={imageUrl}/>
      <Text tabIndex={0} styles={{height:"20vh", position:"fixed", color: "transparent", outline: "none"}} content={"Image shows " + imageClasses.join()}></Text>
    </Box>
  );
}

export default Articles;