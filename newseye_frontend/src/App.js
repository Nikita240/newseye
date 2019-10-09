import React from 'react';
import logo from './logo.svg';
import {Button, Image, Text} from "@stardust-ui/react";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
      <div style={{background: "transparent"}}>Icons made by <a href="https://www.flaticon.com/authors/prosymbols" title="Prosymbols">Prosymbols</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
}

export default App;
