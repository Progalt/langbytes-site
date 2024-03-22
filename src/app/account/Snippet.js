"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Snippet({ id, title, difficulty }) {

    const router = useRouter();

    const onClick = () => {
        router.push("/snip?id=" + id + "&difficulty=" + difficulty + "&lang=JavaScript");
    }

    return (
        <button 
            onClick={onClick}
            className="bg-[#13131d] my-2 p-2 px-4 w-full flex flex-col text-start border-2 border-slate-800 rounded-lg hover:scale-[101%] transition-all duration-150">
            <h1 className="text-xl mb-2">{title}</h1>
            <section className="px-4 w-fit border-2 border-slate-800 rounded-full ">
                {difficulty}
            </section>
        </button>
    );
}