import React from 'react'

const Button = ({children, onClick, type="button"}) => {
    return (
        <button type={type} onClick={onClick} className="text-white w-full bg-gray-800 hover:bg-gray-900 cursor-pointer focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {children}
        </button>
    )
}

export default Button