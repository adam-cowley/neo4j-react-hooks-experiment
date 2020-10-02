import React, { useState } from 'react'
import { Driver } from 'neo4j-driver'
import { LoginForm } from './login'

import { Neo4jContext, createDriver, Neo4jConfig, Neo4jScheme } from './index'

interface Neo4jProviderProps {
    children: React.ReactNode | React.ReactNode[] | null;
    driver?: Driver;
    scheme?: Neo4jScheme;
    host?: string;
    port?: string | number;
    username?: string;
    password?: string;
}

export const Neo4jProvider: React.FC<Neo4jProviderProps> = (props: Neo4jProviderProps) => {
    const [ config, setConfig ] = useState<Neo4jConfig>({})
    const [ driver, setDriver ] = useState<Driver>(props.driver)
    const [ error, setError ] = useState<Error>()
    const [ database, setDatabase ] = useState<string>()

    const attemptLogin = ({ scheme, host, port, username, password, database }) => {
        setConfig({ scheme, host, port, username, password })
        setDatabase(database)

        const driver = createDriver(scheme, host, port, username, password)

        driver.verifyConnectivity()
            .then(() => setDriver(driver))
            .catch(e => setError(e))
    }

    if ( !driver ) {
        return (<LoginForm error={error} onSubmit={attemptLogin} {...props} />)
    }

    return (
        <Neo4jContext.Provider value={{ driver, config, database }}>
            {props.children}
        </Neo4jContext.Provider>
    )
}
