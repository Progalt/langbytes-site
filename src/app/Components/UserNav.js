
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import NavButton from "./NavButton";
import { HiMenu, HiOutlineX  } from "react-icons/hi";
import MobileDropDownNav, { MobileDropDownButton, MobileDropDownDividor, MobileDropDownNavWithButton } from "./MobileDropDown";
import Button from "../progui/Button";
import { IoLogoGithub } from "react-icons/io5";
import Link from "next/link";

export function NavBarButton({ route, highlighted, text}) {

    return (
        <Button href={route} className={highlighted ? "bg-brand-500 border-brand-300 hover:bg-brand-400 text-white" : ""}>

              {text}  
            
        </Button>
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
                        <Link href="https://github.com/Progalt/langbytes-site"
                        className="text-4xl mx-4 text-slate-700 hover:text-slate-500 transition-colors duration-150">
                            <IoLogoGithub />
                        </Link>
                    { !userSignedIn && <>
                        
                        <NavBarButton highlighted={true} route="/signin" text="Sign In"/>
                        <NavBarButton highlighted={false} route="/signin?t=register" text="Register"/>
                    </> }
                    {
                        userSignedIn && 
                        <NavBarButton highlighted={true} route="/account" text="Account"/>
                    }
                    </div>
                </div>
                
            </section>
        </>
    );
}