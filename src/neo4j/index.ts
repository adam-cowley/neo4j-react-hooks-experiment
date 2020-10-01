import { createContext, useContext, useEffect, useState } from "react";
import neo4j, { Driver, QueryResult, Record as Neo4jRecord, Result } from "neo4j-driver";

export type Neo4jScheme = 'neo4j' | 'neo4j+s' | 'neo4j+scc' | 'bolt' | 'bolt+s' | 'bolt+scc'

export interface Neo4jConfig {
    scheme: Neo4jScheme;
    host: string;
    port: number | string;
    username: string;
    password: string;
    database?: string;
}

export interface Neo4jContextState {
    config: Neo4jConfig;
    driver: Driver;
    database?: string;

}

export interface Neo4jResultState {
    cypher: string;
    params?: Record<string, any>;
    database?: string;
    loading: boolean;
    error?: Error
    result?: Result
    records?: Neo4jRecord[],
    first?: Neo4jRecord,
}

export const schemes: Neo4jScheme[] = ['neo4j', 'neo4j+s', 'neo4j+scc', 'bolt', 'bolt+s', 'bolt+scc']

export const Neo4jContext = createContext()

export const createDriver = (scheme: Neo4jScheme, host: string, port: string | number, username: string, password: string) => {
    return neo4j.driver(`${scheme}://${host}:${port}`, neo4j.auth.basic(username, password))
}

export const useCypher = (defaultAccessMode: string, cypher: string, params?: Record<string, any>, database?: string) => {
    const { driver } = useContext(Neo4jContext)

    if ( !driver ) throw new Error('`driver` not defined. Have you added it into your app as <Neo4jContext.Provider value={{driver}}> ?')

    const session = driver.session({ database, defaultAccessMode })

    const [ queryState, setQueryState ] = useState<Neo4jResultState>({
        loading: true,
        cypher,
        params,
        database,
    })

    useEffect(() => {
        session.run(cypher, params)
            .then((result: QueryResult) => {
                setQueryState({
                    cypher,
                    params,
                    database,
                    loading: false,
                    result,
                    records: result.records,
                    first: result.records[0],
                })
            })
            .catch((error: Error) => {
                setQueryState({
                    cypher,
                    params,
                    database,
                    loading: false,
                    error,
                })
            })
        // eslint-disable-next-line
    }, [ cypher, params, database ])


    return queryState
}

export const useCypherRead = (cypher: string, params?: Record<string, any>, database?: string) => useCypher(neo4j.session.READ, cypher, params, database)
export const useCypherWrite = (cypher: string, params?: Record<string, any>, database?: string) => useCypher(neo4j.session.WRITE, cypher, params, database)
