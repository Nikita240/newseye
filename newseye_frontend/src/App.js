import React from 'react';
import './App.css';
import SplashPage from './SplashPage';
import Sources from './Sources';
import Articles from './Articles';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App" tabIndex={0} style={{minHeight: "3000px"}}>
        <Switch>
          <Route exact path="/" component={SplashPage} />
          <Route exact path="/sources" component={Sources} />
          <Route path="/sources/:id" component={Articles} />
        </Switch>
      </div>
  );
}

export default App;
