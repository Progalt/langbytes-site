"use client";
import { useEffect, useState } from "react";
import { TaskSnippet } from "../Components/TaskSnippet";
import { getRandomQuestion, getRandomQuestionID } from "../Backend/database";
import { useRouter } from "next/navigation";


export default function Snip() {

    const [ questionId, setQuestionID ] = useState(-1);
    const [ difficulty, setDifficulty ] = useState("");
    const [ selectedLanguages, setSelectedLanguages ] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has("id")) {
            // We have an ID we want to pass it to the state 
            let id = Number(urlParams.get("id"));
            let diff = urlParams.get("difficulty");
            let langs = urlParams.get("lang");

            setSelectedLanguages([ langs ]);
            setQuestionID(id);
            setDifficulty(diff);
        }

    }, []);

    useEffect( () => {
        window.addEventListener('popstate', function(event) {
          
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("id")) {
            setQuestionID(Number(urlParams.get("id")));
        }
    
          // window.location.reload();
        
      });
      }, []);

    function getAnotherQuestion() {
        getRandomQuestion(difficulty, selectedLanguages).then((data) => {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set("id", data.id);

            const newURL =  '/snip?' + urlParams.toString();
            //window.history.pushState({ path: newURL }, '', newURL);
            router.replace(newURL);
            
            // Don't need the reload
            //window.location.reload();

            setQuestionID(data.id);
        });

    }

    return (
        <main className="p-5 w-full h-screen flex flex-col justify-center items-center">
            <div className="w-full lg:w-[60%]">
                {
                    questionId !== -1 && 
                    <TaskSnippet
                    id={questionId}
                    difficulty={difficulty} 
                    selectedLanguages={selectedLanguages}/>
                }
                {
                    questionId === -1 && 
                    <h1 className="text-center text-2xl text-glow animate-pulse">Beaming in a problem!</h1>
                }
            </div>

            <div className="flex flex-row justify-center items-center p-10 pt-1 mt-4">
                <button 
                onClick={() => {
                    getAnotherQuestion()
                }}
                className="shadow-[0_0px_30px_0] shadow-indigo-500/50 hover:shadow-red-500/50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full p-[2px] transform transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500 hover:via-red-500 hover:to-indigo-500">
                <span className="flex w-full bg-gray-900 text-white rounded-full p-2 px-4">
                    Another question
                </span>
                </button>
            </div>
        </main>
    );

}