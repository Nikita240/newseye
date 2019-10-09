import React from 'react';
import logo from './logo.svg';
import {Label} from "@stardust-ui/react";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Label content={"Test"}/>
      </header>
    </div>
  );
}

export default App;
