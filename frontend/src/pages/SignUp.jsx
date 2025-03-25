import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../main'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const signUpRequest = await axios.post(`${BACKEND_ENDPOINT}/api/v1/user/signup`,{
                firstName, 
                lastName,
                username,
                password
            },{
                headers:{
                    'Content-Type':"application/json"
                }
            })
            localStorage.setItem("token", signUpRequest.data.token);
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
                <form className="rounded-lg w-80 bg-white text-center p-2 h-max px-4 md:min-w-[400px]" onSubmit={handleSignUp}>
                    <Heading>Sign Up</Heading>
                    <SubHeading>Enter Information to create an account </SubHeading>
                    <InputBox label={"First Name"} placeholder={"John"} onChange={(e)=>{setFirstName(e.target.value)}}/>
                    <InputBox label={"Last Name"} placeholder={"Doe"} onChange={(e)=>{setLastName(e.target.value)}}/>
                    <InputBox label={"Username"} placeholder={"abc@example.com"} type='email' onChange={(e)=>{setUsername(e.target.value)}}/>
                    <InputBox label={"Password"} placeholder={"*****"} type={"password"} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <div className="pt-5">
                        <Button type='submit'>Sign up</Button>
                    </div>
                    <BottomWarning label={"Already have an account?"} button={"Sign in"} to={"/signin"}/>
                </form>
            </div>
        </div>
    )
}

export default SignUp