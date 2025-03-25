import React from 'react'

const InputBox = ({label, placeholder, type="text", onChange}) => {
    return (
        <div>
            <div className="text-sm font-semibold text-left pt-3 pb-2">{label}</div>
            <input type={type}placeholder={placeholder} className='w-full rounded border border-slate-200 text-md p-2' onChange={onChange} required/>
        </div>
    )
}

export default InputBox