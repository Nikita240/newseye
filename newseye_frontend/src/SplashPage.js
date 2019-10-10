import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import logo from './logo.svg';
import {Flex, Button, Image, Text, Input} from "@stardust-ui/react";
import './App.css';

export const SplashPage = withRouter(({ history }) => {
  const initialSplashState = {
    searchTerm: ''
  };

  const [state, setState] = useState(initialSplashState);
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
        placeholder="Topics..."
        value={state.searchTerm}
        styles={
          {
            margin: "2vh"
          }
        }
        onChange={(e) => {
          setState({searchTerm: e.target.value});
        }}
      />
      <Button 
        styles={
          {
            marginBottom: "2vh"
          }
        }
        content={"Search"}
        onClick={() => { history.push('/sources/' + state.searchTerm) }}
      />
      <Button 
        content={"Explore news"}
        onClick={() => { history.push('/sources') }}
      />
    </Flex>
  );
});
export default SplashPage;