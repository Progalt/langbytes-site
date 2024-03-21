
"use client";

import { useRouter } from "next/navigation";
import { getRandomQuestion } from "../Backend/database";

export default function NewQuestion({ difficulty, selectedLanguages }) {

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
        className="shadow-[0_0px_30px_0] shadow-indigo-500/50 hover:shadow-red-500/50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl p-[2px] transform transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500 hover:via-red-500 hover:to-indigo-500">
          <span className="flex w-full bg-gray-900 text-white rounded-xl p-2 px-4">
            Give me a question
          </span>
        </button>

      );
}