
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import NavButton from "./NavButton";
import { HiMenu, HiOutlineX  } from "react-icons/hi";
import MobileDropDownNav, { MobileDropDownButton, MobileDropDownDividor, MobileDropDownNavWithButton } from "./MobileDropDown";
import OutsideClick from "./OutsideClick";

function SignInButton() {
    const router = useRouter();

    return (
        <button onClick={ async () => {

        
            router.push("/signin");


            }} className="w-28 flex flex-row items-center justify-center rounded-lg bg-indigo-500 border-indigo-400 hover:bg-indigo-400 hover:border-indigo-300 border-2   p-2 px-6 transition-color duration-200">

            <h1 className="font-semibold">Sign In</h1>  
    
        </button>
           
    );
}

function RegisterButton() {
    const router = useRouter();

    return (
        <button onClick={ async () => {


            router.push("/signin?t=register");


            }} className="w-28 flex flex-row items-center justify-center rounded-lg bg-[#13131d] border-2 border-[#232333] hover:bg-[#232333] hover:border-[#2b2b3d] p-[2px] transition-all duration-200">
            
            
                <h1 className="font-semibold">Register</h1>  
    
        </button>
           
    );
}

function AccountButton() { 

    const router = useRouter();

    return (
        <button onClick={ async () => {

                
            router.push("/account");


            }} className="w-28 flex flex-row items-center justify-center rounded-lg bg-indigo-500 border-2 border-indigo-500 hover:bg-[#0a0a0f]  p-2 px-6 transition-all duration-200">

                <h1 className="font-semibold">Account</h1>  
            
        </button>
    );
}


export default function UserNav() {

    const router = useRouter();
    const supabase = createClient();

    const [ userSignedIn, setUserSignedIn ] = useState(false);

    const [ showDropDownMenu, setShowDropDownMenu ] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        const supabase = createClient();
        
        let { data, error } = await supabase.auth.getUser();
          
        setUserSignedIn(data.user !== null);
      };
  
      fetchData(); // Call the fetchData function
  
    }, []);

    return (
        <>
            <div className=" md:hidden">
                {/* <nav className="p-5 pb-2 flex flex-row justify-end items-center">
                <button onClick={ async () => {                
                        setShowDropDownMenu(!showDropDownMenu);
                    }} className="flex flex-row items-center justify-center rounded-lg border-indigo-500 border-2 hover:bg-indigo-500 bg-[#13131d] p-2 transition-all duration-200 hover:shadow-[0_0_30px_0px] hover:shadow-indigo-500/50">

                        { !showDropDownMenu && <HiMenu className="text-3xl"/> }
                        { showDropDownMenu && <HiOutlineX  className="text-3xl"/> }

                    </button>
                </nav>
                {
                     // We want to display a drop down menu here
                    <OutsideClick onClickOutside={() => { setShowDropDownMenu(false); }}>
                       <MobileDropDownNav visible={showDropDownMenu}>
                            <MobileDropDownButton 
                            visible={showDropDownMenu}
                            onClick={() => {
                                
                            }}
                            title="Educators"
                            highlight={false}
                            />
                            {
                                !userSignedIn && 
                                <>
                                    <MobileDropDownDividor />
                                    <MobileDropDownButton 
                                    visible={showDropDownMenu}
                                    onClick={() => {
                                        router.push("/signin?t=register");
                                    }}
                                    title="Register"
                                    highlight={false}
                                    />
                                    <MobileDropDownButton 
                                    visible={showDropDownMenu}
                                    onClick={() => {
                                        router.push("/signin");
                                    }}
                                    title="Sign In"
                                    highlight={true}
                                    />
                                </>
                            }
                            {
                                userSignedIn && 
                                <MobileDropDownButton 
                                visible={showDropDownMenu}
                                onClick={() => {
                                    router.push("/account");
                                }}
                                title="Account"
                                highlight={true}
                                />
                            }
                            
                       </MobileDropDownNav>
                    </OutsideClick>
                } */}
                <MobileDropDownNavWithButton borderStyling="border-2 border-[#232333]">
                    <MobileDropDownButton 
                    onClick={() => {
                        
                    }}
                    title="Roadmap"
                    highlight={false}
                    />
                    <MobileDropDownButton 
                    onClick={() => {
                        
                    }}
                    title="Educators"
                    highlight={false}
                    />
                    {
                        !userSignedIn && 
                        <>
                            <MobileDropDownDividor />
                            <MobileDropDownButton 

                            onClick={() => {
                                router.push("/signin?t=register");
                            }}
                            title="Register"
                            highlight={false}
                            />
                            <MobileDropDownButton 
                            onClick={() => {
                                router.push("/signin");
                            }}
                            title="Sign In"
                            highlight={true}
                            hightlightColour="bg-indigo-500"
                            outlineStyling="border-2 border-indigo-400"
                            />
                        </>
                    }
                    {
                        userSignedIn && 
                        <>
                            <MobileDropDownButton 
                            onClick={() => {
                                router.push("/account");
                            }}
                            title="Account"
                            highlight={true}
                            outlineStyling="border-2 border-indigo-400"
                            />
                        </>
                    }
                </MobileDropDownNavWithButton>
            </div>
            <section className="w-full 2xl:w-[50%] mx-auto">
                <div className="p-5 mx-7 md:flex flex-row justify-between items-center gap-2 hidden">
                    <div className="flex flex-row gap-10">
                        <NavButton name="Roadmap" location="/educators" />
                        <NavButton name="Educators" location="/educators" />
                        
                    </div>
                    <div className="flex-shrink-0 flex flex-row gap-2 h-10">
                    { !userSignedIn && <>
                        <SignInButton />
                        <RegisterButton />
                    </> }
                    {
                        userSignedIn && 
                        <AccountButton />
                    }
                    </div>
                </div>
            </section>
        </>
    );
}