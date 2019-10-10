import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {Button, Flex,Header } from "@stardust-ui/react";
import './App.css';
import NewsRestClient from './NewsRestClient';

export const Sources = withRouter(({ history }, props) => {
  
  const initialSourcesState = {
    sources: []
  };

  const [sources, setSources] = useState(initialSourcesState);
  

  useEffect(() => {
    const client = new NewsRestClient();
    const getSources = async () => {
      // Pass our param (:id) to the API call
      const {sources} = await client.getAllSources();
      const newSources = [];
      sources.forEach(source => {
        newSources.push(getSourceCard(source.name, source.id, history));
      });
      setSources({sources: newSources});
    }

    // Invoke the async function
    getSources()
  }, [history]);
  return (
    <Flex
      className="Sources" 
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
          content="News Sources" 
          description="Select which publication you would like to see articles from" color={"yellow"} 
        />
      </div>
      {sources.sources}
    </Flex>
  );
});

function getSourceCard(title, key, history){
  const content = 
    <Flex styles={{width: "100vh"}} gap="gap.medium" debug>
      <Flex.Item grow>
        <Flex column gap="gap.small" vAlign="stretch">
          <Flex space="between">
            <Header as="h3" styles={{paddingLeft: "3vh"}}content={title} />
          </Flex>
        </Flex>
      </Flex.Item>
    </Flex>;

  return (
    <Button
      key={"source_" + key}
      styles={{maxWidth: "80vh", height:"10vh", alignContent: "center"}}
      content={content}
      onClick={() => { history.push('/sources/'+ key) }}
    >
    </Button>
  );
}
    

export default Sources;