"use client";
import { useEffect, useRef, useState } from "react";
import SignInEmailPassword, { RegistrationEmailPassword } from "../Components/SignIn";
import AnimateHeight from "react-animate-height";
import { redirect, useRouter, useSearchParams  } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export function SignIn({ shouldRedirect, onConfirm }) {

    const [ signInSelected, setSignInSelected ] = useState(true);
    const [height, setHeight] = useState('auto');
    const contentDiv = useRef(null);
    const [ registerShowConfirm, setShowConfirm ] = useState(false);
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams()

    useEffect(() => {
        
        if (searchParams.get("t") === "register") {
            setSignInSelected(false);
        }
        
    }, []);
  

    const  onSignIn = async ({ email, password }) => {
        // we want to sign the user in
      
        const { error } = await supabase.auth.signInWithPassword({
            email, 
            password
        });

        if (error) {
            console.log(err);
            return;
        }

        //console.log(data);

        if (onConfirm) {
            onConfirm(); 
        }
        if (shouldRedirect == true)
            router.push("/account");
       
    }



    const onRegister = async ({ email, password })  => {
        // we want to register the user
        
        const data = {
            email: email,
            password: password
          }
        
          const { error } = await supabase.auth.signUp(data)
        
          if (error) {
            console.log(error);
            return;
          }

        if (onConfirm) {
            onConfirm(); 
        }
       
        setShowConfirm(true);
    }

    return (
        <>
            <nav className="relative flex flex-row justify-between items-center h-full mb-8">
                <div 
                className={`absolute top-0 w-[50%] h-10 border-2 border-indigo-500 shadow-[0_0px_20px_0px] shadow-indigo-700 bg-transparent transition-all duration-300 ease-in-out rounded-xl ${ !signInSelected ? "left-[50%]" : "left-0"}`} />
                <button className="w-full bg-[#212536] m-1 rounded-lg h-8" onClick={() => {setSignInSelected(true); console.log("Sign In selected"); }}>Sign In</button>
                <button className="w-full bg-[#212536] m-1 rounded-lg h-8" onClick={() => {setSignInSelected(false); console.log("Register") }}>Register</button>
            </nav>
            {
                signInSelected && 
                <section>
                    <h1 className="text-2xl mb-4">Welcome Back</h1>
                    <hr className="border-[1px] rounded-lg border-slate-800 mb-4"/>
                    <SignInEmailPassword 
                    onSubmit={onSignIn}
                    errorText=""/>
                </section>
            }
            {
                !signInSelected &&
                <section>
                    {
                        !registerShowConfirm &&
                        <>
                            <h1 className="text-2xl mb-4">Register</h1>
                            <hr className="border-[1px] rounded-lg border-slate-800 mb-4"/>
                            <RegistrationEmailPassword
                            onSubmit={onRegister}
                            errorText=""
                            />
                        </>
                    }
                    {
                        registerShowConfirm &&
                        <div className="border-2 border-slate-800 rounded-lg p-4">
                            <h1 className="text-2xl text-glow">Thank you, and Welcome!</h1>
                            <h1 className="text-lg">An email has been sent to you to verify your email</h1>
                        </div>
                    }
                </section>
            }
        </>
    );
}