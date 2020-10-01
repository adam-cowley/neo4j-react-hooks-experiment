# Experiments with React Hooks

> How can we make interacting with Neo4j directly through Cypher simpler in a React component?  Eg. for Graph Apps


## Context & Provider

```tsx
import { createDriver, Neo4jContext } from './neo4j'

// Helper function for creating a driver (no more `neo4j.driver(uri, neo4j.auth.basic(username, password))`)
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
```

## `useCypher{Read|Write}` Hooks

```tsx
function Component() {
  const { loading, first, cypher } = useCypherRead('MATCH (n) RETURN count(n) AS count')
  const count = first && first.get('count').toNumber()

  return (
    <div>
        { loading && <p>Loading...</p> }
        { !loading && <p>There are {count} nodes in the database</p> }

        <pre>{cypher}</pre>
    </div>
  );
}
```

State:
```
export interface Neo4jResultState {
    cypher: string;
    params?: Record<string, any>;
    database?: string;

    // Is query loading?
    loading: boolean;
    error?: Error;

    // Access result for summary etc...
    result?: Result

    // All records
    records?: Neo4jRecord[],

    // Make it easy to get the first record
    first?: Neo4jRecord,

}
```



## TODO

- Login Forms?
  - Login Form component - scheme, host, port, username, password?
  - Set credentials & driver - create a new driver on the fly?
