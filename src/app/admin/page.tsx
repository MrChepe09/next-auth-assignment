'use client'
import Spinner from "@/components/spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Admin() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const response = await axios.delete('/api/auth')
            router.push('/');
          } catch (err: any) {
            console.log(err.message);
          } finally {
            setIsLoading(false);
          }
    }
    return (
        <div className="h-[100vh] w-[100%] flex flex-col items-center justify-center">
            <h1 className="text-[22px] font-[600]">Hello Admin</h1>
            <button onClick={handleLogout} className="bg-[#23a3fb] py-1 px-8 mt-4 rounded-[0.3rem]">{isLoading ? <Spinner /> : "Logout"}</button>
        </div>
    );
}