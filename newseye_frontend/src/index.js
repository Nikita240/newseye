import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, themes } from '@stardust-ui/react'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <Provider theme={themes.teamsDark}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
