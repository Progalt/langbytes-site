
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";


export default function UserNav() {

    const router = useRouter();
    const supabase = createClient();

    const [ userSignedIn, setUserSignedIn ] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        const supabase = createClient();
        
        let { data, error } = await supabase.auth.getUser();
          
        setUserSignedIn(data.user !== null);
      };
  
      fetchData(); // Call the fetchData function
  
    }, []);

    return (
        <div className="p-5 flex flex-row justify-between gap-2">
            <div>
            
            </div>
            <div className="flex-shrink-0 flex flex-row gap-2 h-10">
            { !userSignedIn && <>
                <button onClick={ async () => {

            
                router.push("/signin");


                }} className="w-28 flex flex-row items-center justify-center rounded-lg bg-indigo-500 hover:bg-[#0a0a0f] border-indigo-500 border-2   p-2 px-6 transition-color duration-200">

                <h1 className="font-semibold">Sign In</h1>  
            
                </button>
                <button onClick={ async () => {


                router.push("/signin?t=register");


                }} className="w-28 flex flex-row items-center justify-center rounded-lg bg-[#0a0a0f] border-2 border-indigo-500 p-[2px] transition-all duration-200">
                
                
                    <h1 className="font-semibold">Register</h1>  
        
                </button>
            </> }
            {
                userSignedIn && 
                <button onClick={ async () => {

            
                router.push("/account");
    
    
                }} className="w-28 flex flex-row items-center justify-center rounded-lg bg-indigo-500 border-2 border-indigo-500 hover:bg-[#0a0a0f]  p-2 px-6 transition-all duration-200">
    
                    <h1 className="font-semibold">Account</h1>  
                
                </button>
            }
            </div>
        </div>
    );
}