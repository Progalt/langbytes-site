"use client";

import { useRouter } from "next/navigation";
import { PiHouse } from "react-icons/pi";

export default function BackHomebutton() {

    const router = useRouter();

    return (
        <button onClick={ async () => {                
            router.push("/");
        }} className="flex flex-row items-center justify-center rounded-lg bg-gradient-to-tr from-purple-500  to-indigo-500  p-2 transition-all duration-200 shadow-[0_0_30px_0px] shadow-indigo-500/50 hover:scale-110">

            {/* <h1 className="font-bold">Home</h1>   */}
            <PiHouse className="text-3xl"/>

        </button>
    );
}