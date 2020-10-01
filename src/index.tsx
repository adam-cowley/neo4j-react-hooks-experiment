import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createDriver, Neo4jContext } from './neo4j/index'

const driver = createDriver('bolt', 'localhost', 7687, 'neo4j', 'neo')

ReactDOM.render(
  <React.StrictMode>
    {/* Can we do this automagically? */}
    <Neo4jContext.Provider value={{ driver }}>
      <App />
    </Neo4jContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
