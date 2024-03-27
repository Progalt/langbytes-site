
"use client";

import { useRouter } from "next/navigation";
import { getRandomQuestion } from "../Backend/database";

export default function NewQuestion({ difficulty, selectedLanguages, func }) {

    const router = useRouter();

    async function getNewID() {

        let data = await getRandomQuestion(difficulty, selectedLanguages);
    
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("id", data.id);
        urlParams.set("difficulty", difficulty);
        urlParams.set("lang", selectedLanguages);
        
        const newURL = "/snip" + '?' + urlParams.toString();
    
        router.push(newURL);

      }

      return (
        <button 
        onClick={() => {
          getNewID();
         
          
        }}
        className="shadow-lg shadow-black bg-gradient-to-tl from-emerald to-brand-500 text-white font-semibold rounded-xl p-[2px] transform transition-all duration-300 ">
          <span className="flex w-full bg-[#13131d] hover:bg-[#232333] text-white rounded-xl p-2 px-6">
            Give me a question
          </span>
        </button>

      );
}