import React from 'react'

const Heading = ({children}) => {
    return (
        <h1 className='text-3xl font-bold pt-4'>
            {children}
        </h1>
    )
}

export default Heading