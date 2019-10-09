import React from 'react';
import './App.css';
import SplashPage from './SplashPage';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={SplashPage} />
        </Switch>
      </header>
      <div style={{background: "transparent"}}>Icons made by <a href="https://www.flaticon.com/authors/prosymbols" title="Prosymbols">Prosymbols</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
}

export default App;
