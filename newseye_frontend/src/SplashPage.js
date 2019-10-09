import React from 'react';
import logo from './logo.svg';
import {Flex, Button, Image, Text} from "@stardust-ui/react";
import './App.css';

function SplashPage() {
  return (
    <Flex className="SplashPage" column styles={{alignItems: "center"}}>
      <Image
        styles={
          {
            width: "30vh"
          }
        }
        circular 
        src={logo} 
        className="App-logo" 
        alt="logo" />
      <Text 
        styles={
          {
            paddingBottom: "2vh"
          }
        }
        content="Welcome to NewsEye" 
        size="largest" 
        weight="bold"
      />
      <Button content={"Explore news"}/>
    </Flex>
  );
}

export default SplashPage;
