import React from 'react'
import { useNavigate } from 'react-router-dom'

const BottomWarning = ({label, button, to}) => {

    const navigate = useNavigate();

    return (
        <div className='text-sm flex justify-center gap-1 font-medium text-slate-600 pt-1 pb-2 '>
            <div>
                {label}
            </div>
            <div onClick={()=>navigate(to)} className='underline cursor-pointer'>
                {button}
            </div>
        </div>
    )
}

export default BottomWarning 