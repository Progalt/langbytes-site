"use client";

import { useRouter } from "next/navigation";
import { PiHouse } from "react-icons/pi";

export default function BackHomebutton() {

    const router = useRouter();

    return (
        <button onClick={ async () => {                
            router.push("/");
        }} className="flex flex-row items-center justify-center rounded-lg border-indigo-500 border-2 hover:bg-indigo-500 bg-[#13131d] p-2 transition-all duration-200 hover:shadow-[0_0_30px_0px] hover:shadow-indigo-500/50">

            {/* <h1 className="font-bold">Home</h1>   */}
            <PiHouse className="text-3xl"/>

        </button>
    );
}