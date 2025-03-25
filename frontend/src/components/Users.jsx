import React, { useEffect, useState } from 'react'
import Button from './Button'
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../main';
import { toast } from 'react-toastify';
import User from './User';
import { useNavigate } from 'react-router-dom';

const Users = () => {

    const [searchFilter, setSearchFilter] = useState("");
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const main = async () => {
            if (!token) {
                navigate("/signin");
                return
            }
            try{
                const bulkReq = await axios.get(`${BACKEND_ENDPOINT}/api/v1/user/bulk?filter=${searchFilter}`,{
                    headers: {
                        Authorization:`Bearer ${token}`
                    }
                });
                setUsers(bulkReq.data.user);
            }
            catch(err)
            {
                toast.error(err.response.data.message);
            }
        }
        main();
    }, [searchFilter])
    

    return (
        <div className='flex flex-col'>
            <div className="text-2xl font-bold my-4">Users</div>
            <input type="text" placeholder="Search users..." className='border border-slate-200 p-2 text-md w-full rounded-md' onChange={(e)=>{setSearchFilter(e.target.value)}}/>
            {
                users.map(u => <User name={u.firstName + " " + u.lastName} id={u._id} />)
            }
        </div>
    )
}



export default Users