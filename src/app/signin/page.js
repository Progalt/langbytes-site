"use client";
import { useEffect, useRef, useState } from "react";
import SignInEmailPassword, { RegistrationEmailPassword } from "../Components/SignIn";
import AnimateHeight from "react-animate-height";


export default function SignIn() {

    const [ signInSelected, setSignInSelected ] = useState(true);
    const [height, setHeight] = useState('auto');
    const contentDiv = useRef(null);
  
  
    useEffect(() => {
      const element = contentDiv.current;
  
      const resizeObserver = new ResizeObserver(() => {
        setHeight(element.clientHeight);
      });
  
      resizeObserver.observe(element);
  
      return () => resizeObserver.disconnect();
    }, [ ]);

    const  onSignIn = () => {

    }

    const onRegister = () => {

    }

    return (
       <main className="flex justify-center items-center flex-col min-h-screen">
            <AnimateHeight 
              height={height}
              contentClassName="auto-content"
              contentRef={contentDiv}
              disableDisplayNone
               className="p-10 shadow-[0_0px_200px_30px] shadow-indigo-500/20 border-2 border-slate-800 rounded-xl w-[50%]">
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
                        <SignInEmailPassword 
                        onSubmit={onSignIn}
                        errorText=""/>
                    </section>
                }
                {
                    !signInSelected &&
                    <section>
                        <h1 className="text-2xl mb-4">Register</h1>
                        <RegistrationEmailPassword
                        onSubmit={onRegister}
                        errorText=""
                        />
                    </section>
                }
                <div className="h-20"></div>
            </AnimateHeight>
       </main>
    );
}