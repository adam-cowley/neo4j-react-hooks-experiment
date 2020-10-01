import { Driver } from 'neo4j-driver'
import React, { useState } from 'react'
import LoginForm from './login'

import { Neo4jContext, createDriver, Neo4jConfig } from './index'

export default function Neo4jAppProvider(props) {
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