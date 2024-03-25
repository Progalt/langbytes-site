"use client";
import { useEffect, useState } from "react";
import { TaskSnippet, knownLanguages } from "../Components/TaskSnippet";
import { getRandomQuestion, getRandomQuestionID } from "../Backend/database";
import { useRouter } from "next/navigation";
import { SignIn } from "../signin/signin";
import { Modal } from "../Components/Modal";
import OutsideClick from "../Components/OutsideClick";
import BackHomebutton from "../signin/homeButton";

import "../Styles.css";


export default function Snip() {

    const [ questionId, setQuestionID ] = useState(-1);
    const [ difficulty, setDifficulty ] = useState("");
    const [ selectedLanguages, setSelectedLanguages ] = useState([]);
    const router = useRouter();
    const [modalOpen, setModalOpen ] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has("id")) {
            // We have an ID we want to pass it to the state 

            // TODO: Error check
            let id = Number(urlParams.get("id"));
            let diff = urlParams.get("difficulty");
            let langs = urlParams.get("lang");

            const knownDifficulties = [
                "Easy", 
                "Medium",
                "Hard"
            ];

            if (!knownDifficulties.includes(diff)) {
                router.push("/error");
            }

            setQuestionID(id);
            setDifficulty(diff);

            


            if (langs === "" || !knownLanguages.includes(langs)) {
                setSelectedLanguages("JavaScript");
            }
            else {
                setSelectedLanguages([ langs ]);
            }
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
        <main className="p-5 w-full h-screen flex justify-center">
            <div className="absolute top-0 left-0 p-5">
                <BackHomebutton></BackHomebutton>
            </div>
            <section className="flex flex-col justify-center items-center w-[100%] md:w-[60%] 2xl:w-[40%]">
                <div className="background-svg-snip bg-[length:200%] md:bg-[length:110%]" />
                <div className={`w-full mt-14 ${modalOpen ? "blur-sm" : ""}`}
                style={{  }}>
                    {
                        questionId !== -1 && 
                        <TaskSnippet
                        id={questionId}
                        difficulty={difficulty} 
                        selectedLanguages={selectedLanguages}
                        onNotSignedIn={() => {
                            setModalOpen(true);
                        }} />
                    }
                    {
                        questionId === -1 && 
                        <h1 className="text-center text-2xl text-glow animate-pulse">Beaming in a problem!</h1>
                    }
                </div>

                <div className="flex flex-row justify-center items-center pt-1 mt-4 mb-4">
                    <button 
                    onClick={() => {
                        getAnotherQuestion()
                    }}
                    className="shadow-[0_0px_30px_0] shadow-indigo-500/50 hover:shadow-red-500/50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg p-[2px] transform transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:via-red-500 hover:to-indigo-500">
                    <span className="flex w-full bg-gray-900 text-white rounded-lg p-2 px-4">
                        Another question
                    </span>
                    </button>
                
                </div>
            </section>
           
            { modalOpen && 
                <Modal setOpen={setModalOpen}>
                    <SignIn shouldRedirect={false} onConfirm={() => {
                        setModalOpen(false);
                    }}/>
                </Modal>
            }
        </main>
    );

}