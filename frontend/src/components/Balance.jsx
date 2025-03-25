import React from 'react'

const Balance = ({children}) => {
    return (
        <div className='flex border-b-1  border-slate-200'>
            <div className="font-bold text-lg">
                Your Balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {children}
            </div>
        </div>
    )
}

export default Balance