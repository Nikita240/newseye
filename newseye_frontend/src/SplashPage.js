import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import logo from './logo.svg';
import {Dropdown, Flex, Button, Image, Text, Input} from "@stardust-ui/react";
import './App.css';
import NewsRestClient from './NewsRestClient';

let _selectedSourceId = null;
export const SplashPage = withRouter(({ history }) => {
  const initialSplashState = {
    sourcesList: [],
    sources: {}
  };

  const initialSplashState2 = {
    searchTerm: ''
  };

  const [state, setState] = useState(initialSplashState);
  const [state2, setState2] = useState(initialSplashState2);
  useEffect(() => {
    const client = new NewsRestClient();
    const getSources = async () => {
      // Pass our param (:id) to the API call
      const {sources} = await client.getAllSources();
      const newSourcesList = [];
      const newSources = {};
      sources.forEach(source => {
        newSourcesList.push(source.name);
        newSources[source.name] = source.id;
      });
      setState({sourcesList: newSourcesList, sources: newSources});
    }

    // Invoke the async function
    getSources()
  }, [history]);

  return (
    <Flex className="SplashPage" column styles={{alignItems: "center"}}>
      <Image
        styles={
          {
            paddingTop: "2vh",
            width: "30vh"
          }
        }
        circular 
        src={logo} 
        className="App-logo" 
        alt="logo" 
      />
      <Text 
        styles={
          {
            paddingTop: "2vh",
            fontSize: "28px"
          }
        }
        content="Welcome to NewsEye"
        weight="bold"
      />
      <Text 
        content="News. From everyone. For everyone." 
        size="small"
      />
      <Input 
        icon="search"
        aria-label={"Please enter a topic to search"}
        placeholder="Topics..."
        value={state.searchTerm}
        styles={
          {
            marginTop: "4vh",
            border: "coral 1px solid",
            marginBottom: "1vh"
          }
        }
        onChange={(e) => {
          setState2({searchTerm: e.target.value});
        }}
      />
      <Dropdown
        search
        styles={{
          backgroundColor: "black", 
          border: "coral 1px solid",
          marginBottom: "4vh"
        }}
        clearable
        items={state.sourcesList}
        placeholder="Start typing the name of a news site"
        noResultsMessage="We couldn't find any matches."
        highlightFirstItemOnOpen
        getA11ySelectionMessage={{
          onAdd: item => {
            _selectedSourceId = state.sources[item];
            console.log(_selectedSourceId);
            return `${item} has been selected.`
          },
        }}
        
      />
      <Button 
        styles={
          {
            marginBottom: "2vh"
          }
        }
        content={"Search"}
        onClick={() => {
          if (_selectedSourceId !== null) {
            history.push('/search/' + state2.searchTerm + '/' + _selectedSourceId);
          } else {
            history.push('/search/' + state2.searchTerm);
          }
        }}

      />
      <Button 
        content={"Explore news"}
        onClick={() => { history.push('/sources') }}
      />
    </Flex>
  );
});
export default SplashPage;