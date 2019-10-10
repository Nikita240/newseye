import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {Button, Box, Flex,Header, Grid, gridBehavior } from "@stardust-ui/react";
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
        padding: "10vh",
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
      <Grid content={sources.sources} columns={4} accessibility={gridBehavior}/>
    </Flex>
  );
});

function getSourceCard(title, key, history){
  const content = 
    <Box styles={{height:"10vh", margin:"1px"}}>
      <Header as="h3" content={title} />
    </Box>;
  return (
    <Button
      key={"source_" + key}
      styles={{height:"10vh", width: "500vh", alignContent: "center", border: "coral 1px solid"}}
      content={content}
      onClick={() => { history.push('/sources/'+ key) }}
    >
    </Button>
  );
}
    

export default Sources;