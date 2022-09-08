import React from 'react'

import BusLocationSocket from './BusLocationSocket'

// i might add other real time sockets here.

const Sockets = ({ children }) => {
    return (
        <>
            <BusLocationSocket>
                {children}
            </BusLocationSocket>
        </>
    )
}

export default Sockets