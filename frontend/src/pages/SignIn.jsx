import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import { BACKEND_ENDPOINT } from '../main'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const signInRequest = await axios.post(`${BACKEND_ENDPOINT}/api/v1/user/signin`,{
                username,
                password
            },{
                headers:{
                    'Content-Type':"application/json"
                }
            })
            localStorage.setItem("token", signInRequest.data.token);
            navigate("/dashboard")
        }
        catch(err)
        {
            toast.error(err.response.data.message);
        }
    }

    return (
        <div className='bg-slate-300 h-screen flex justify-center items-center'>
            <div className="flex flex-col justify-center ">
                <form className="rounded-lg w-80 bg-white text-center p-2 h-max px-4 md:min-w-[400px]" onSubmit={handleSignIn}>
                    <Heading>Sign In</Heading>
                    <SubHeading>Enter Information to sign in into your account </SubHeading>
                    <InputBox label={"Username"} placeholder={"abc@example.com"} type='email' onChange={(e)=>{setUsername(e.target.value)}} />
                    <InputBox label={"Password"} placeholder={"*****"} type={"password"} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <div className="pt-5">
                        <Button type='submit'>Sign in</Button>
                    </div>
                    <BottomWarning label={"Don't have an account?"} button={"Sign up"} to={"/signup"}/>
                </form>
            </div>
        </div>
    )
}

export default SignIn