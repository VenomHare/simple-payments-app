import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BACKEND_ENDPOINT } from '../main'

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const main = async () => {
            if (!token) {
                navigate("/signin");
                return
            }
            try{
                const amountReq = await axios.get(`${BACKEND_ENDPOINT}/api/v1/account/balance`,{
                    headers: {
                        Authorization:`Bearer ${token}`
                    }
                });
                setBalance(amountReq.data.balance)
            }
            catch(err)
            {
                toast.error(err.response.data.message);
            }
        }
        main();
    }, [])

    return (
        <div className='h-screen'>
            <Appbar />
            <div className="m-8">
                <Balance>{balance}</Balance>
                <Users/>
            </div>
        </div>
    )
}

export default Dashboard