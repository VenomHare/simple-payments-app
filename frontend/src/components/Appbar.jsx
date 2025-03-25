import React from 'react'
import { useNavigate } from 'react-router-dom'

const Appbar = () => {
    const navigate = useNavigate();
    return (
        <div className='h-14 shadow flex justify-between items-center'>
            <div onClick={()=>{navigate("/dashboard")}} className="text-xl cursor-pointer md:text-3xl font-bold flex flex-col justify-center h-full ml-4">
                Paytm Clone
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center mr-4">
                </div>
                <div className="rounded-full h-10 w-10 md:w-12 md:h-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        U
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appbar   