import React from 'react';
import './App.css';

import { useReadCypher } from 'use-neo4j'

function App() {
  const { loading, first, cypher } = useReadCypher('MATCH (n) RETURN count(n) AS count')
  const count = first && first.get('count').toNumber()

  return (
    <div className="App">
      <header className="App-header">

        <pre>{cypher}</pre>

        { loading && <p>Loading...</p> }
        { !loading && <p>There are {count} nodes in the database</p> }

      </header>
    </div>
  );
}

export default App;
