/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import { createDriver, createNeo4jContext, Neo4jContext } from './neo4j/index'

// const driver = createDriver('bolt', 'localhost', 7687, 'neo4j', 'neo')

// const Neo4jApp = createNeo4jContext('bolt', 'localhost', 7687, 'neo4j', 'neo')

import { Neo4jProvider } from './neo4j/app'


ReactDOM.render(
  <React.StrictMode>
    <Neo4jProvider host="foo">
      {/* <div>hi</div> */}
      <App />
    </Neo4jProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
