"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../spinner";

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth', {
       email,
       password
      })
      if(response?.data?.type === 'user'){
        router.push('/user')
      } else {
        router.push('/admin');
      }
    } catch (err: any) {
      console.log(err.message);
      setErrorMsg(true)

      setTimeout(() => {
        setErrorMsg(false);
      }, 1500)
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = async (e: any) => {
    setUserDetails((prev) => { return {...prev, [e.target.name]: e.target.value}; })
  }

  const {email, password} = userDetails;
  return (
    <div className="bg-[white] p-12">
      <h1 className="text-[22px] font-[600] mb-4 text-center text-[black]">LOGIN</h1>
      <div className="flex flex-col justify-center items-center text-[black]">
        <input value={email} onChange={handleChange} className="border-[black] border-[2px] border-solid text-[black] outline-none px-3 py-2 my-2 rounded-[0.3rem]" name="email" placeholder="email" />
        <input value={password} onChange={handleChange} className="border-[black] border-[2px] border-solid text-[black] outline-none px-3 py-2 my-4 rounded-[0.3rem]" name="password" placeholder="password" type="password" />
        <button onClick={handleLogin} className="border-[#2ea3fb] border-[2px] border-solid bg-[#2ea3fb] text-[white] my-2 px-8 py-1 rounded-[0.3rem]" type="submit">{isLoading ? <Spinner /> : "Submit"}</button>
      </div>
      {errorMsg && 
        <h1 className="text-center text-[16px] text-[red] mt-2">Invalid user credentials!</h1>
      }
    </div>
  );
}