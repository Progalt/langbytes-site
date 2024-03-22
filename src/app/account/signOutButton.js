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
        className="shadow-[0_0px_30px_0] shadow-indigo-500/50 hover:shadow-red-500/50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full p-[2px] transform transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500 hover:via-red-500 hover:to-indigo-500">
            <span className="flex w-full bg-gray-900 text-white rounded-full p-2 px-4">
                Sign Out
            </span>
        </button>
        );

}