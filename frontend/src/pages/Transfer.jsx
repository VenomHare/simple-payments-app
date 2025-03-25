import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { BACKEND_ENDPOINT } from '../main';
import Appbar from '../components/Appbar';



const Transfer = () => {
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState(0);

    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const handleTransfer = async (e) => {
        e.preventDefault();
        try{
            const TransferReq = await axios.post(`${BACKEND_ENDPOINT}/api/v1/account/transfer`,{
                to: id,
                amount
            },{
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Transfer Complete");
            navigate("/dashboard");
        }
        catch(err)
        {
            toast.error(err.response.data.message);
            return
        }
    }

    return (<>
        <Appbar/>
        <div className='h-[95dvh] flex justify-center items-center bg-gray-300'>
            <div className="rounded-lg max-w-md w-80 md:w-md shadow bg-white flex flex-col items-center">
                <div className='text-2xl font-bold mt-5 mb-10'>Send Money</div>
                <div className="flex items-center gap-2 mb-3">

                    <div className="h-10 md:h-12 w-10 md:w-12 rounded-full bg-green-500">
                        <div className="flex items-center justify-center h-full text-lg md:text-xl font-bold">
                            {name.split("")[0]}
                        </div>
                    </div>

                    <div className="text-2xl font-semibold">
                        {name}
                    </div>
                </div>
                
                <form className="w-full flex flex-col items-center my-3" onSubmit={handleTransfer}>
                    <div className="text-lg font-semibold w-[90%]">Amount (in Rs)</div>
                    <input type="number" className='w-[90%] rounded-md border border-slate-200 p-2 text-lg font-semibold' required min={1} onChange={(e)=>{setAmount(parseInt(e.target.value))}}/>
                    <button className='w-[90%] p-2 py-3 my-4 bg-green-500 rounded-md text-white font-semibold cursor-pointer'>
                        Initiate Transfer
                    </button>
                </form>

            </div>
        </div>
    </>
    )
}

export default Transfer