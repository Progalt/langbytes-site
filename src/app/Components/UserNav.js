
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import NavButton from "./NavButton";
import { HiMenu, HiOutlineX  } from "react-icons/hi";
import MobileDropDownNav, { MobileDropDownButton, MobileDropDownDividor, MobileDropDownNavWithButton } from "./MobileDropDown";

export function NavBarButton({ route, highlighted, text}) {
    const router = useRouter();

    return (
        <button onClick={ async () => {

                
            router.push(route);


            }} className={`w-28 border-2 shadow-lg shadow-black flex flex-row items-center justify-center rounded-xl ${highlighted ? "bg-brand-500 border-brand-300 hover:bg-brand-400 hover:border-brand-300" : "bg-[#13131d] border-[#232333] hover:bg-[#232333] hover:border-[#2b2b3d]" }   p-2 px-6 transition-color duration-200`}>

                <h1 className="font-semibold">{text}</h1>  
            
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
                            hightlightColour="bg-brand-500"
                            outlineStyling="border-2 border-brand-400"
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
                            outlineStyling="border-2 border-brand-400"
                            />
                        </>
                    }
                </MobileDropDownNavWithButton>
            </div>
            <section className="w-full 2xl:w-[50%] mx-auto">
                <div className="p-3 mx-7 md:flex flex-row justify-between items-center gap-2 hidden">
                    <div className="flex flex-row gap-10">
                        
                    </div>
                    <div className="flex-shrink-0 flex flex-row gap-2 h-10">
                    { !userSignedIn && <>
                        
                        <NavBarButton highlighted={true} route="/signin" text="Sign In"/>
                        <NavBarButton highlighted={false} route="/signin?t=register" text="Register"/>
                    </> }
                    {
                        userSignedIn && 
                        <NavBarButton highlighted={true} route="/accpunt" text="Account"/>
                    }
                    </div>
                </div>
                
            </section>
        </>
    );
}