"use client";

import { createClient } from "../utils/supabase/client";
import { useRouter } from 'next/navigation'

export default function SignOutButton() {

    const supabase = createClient();
    const router = useRouter(); 

    const action = async () => {
        supabase.auth.signOut();

        // we want to navigate back to the main page
        router.push("/");
    }

    return (
        <button 
        onClick={action} 
        className="w-28 flex flex-row items-center justify-center rounded-lg bg-[#0a0a0f] border-2 border-indigo-500 p-[2px] transition-all duration-200 hover:bg-indigo-500">
            <h1 className="font-semibold">Sign Out </h1>  
        </button>
        );

}