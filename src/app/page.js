"use client";
import { useEffect, useState } from "react";
import { TaskSnippet, supabase } from "./Components/TaskSnippet";
import { IoPerson } from "react-icons/io5";
import { DifficultyButton } from "./Components/DifficultyButton";
import { Modal } from "./Components/Modal";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdBackHand } from "react-icons/md";
import { LanguageButton } from "./Components/LanguageButton";
import { Inter } from "next/font/google";

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default function Home() {

  const [ showQuestion, setShowQuestion ] = useState(false);
  const [ questionId, setQuestionID ] = useState(0);
  const [ difficulty, setDifficulty ] = useState("Medium");
  const [ questionCount, setQuestionCount] = useState(null);
  const [ selectedLanguages, setSelectedLanguages ] = useState([ "Python", "JavaScript" ]);

  useEffect( () => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("id"))
    {
      // We have an ID we want to pass it to the state 
      let id = Number(urlParams.get("id"));
      let diff = urlParams.get("difficulty");
      console.log(id);
      console.log(diff);

      setQuestionID(id);
      setShowQuestion(true);
      setDifficulty(diff);
    }
    else {

      async function getCount() {
        const { data, count } = await supabase
          .from('question')
          .select('*', { count: 'exact', head: true });

        console.log(count);

        setQuestionCount(count);
      }

      getCount();

      // No Id was specified
      setShowQuestion(false);
    }
  }, []);

  const updateDifficulty = (difficulty) => {
    console.log(difficulty);
    setDifficulty(difficulty);
  }

  async function getNewID() {
    const { data, err } = await supabase
    .from("question")
    .select("*") 
    .eq("difficulty", difficulty);

    let idx = getRandomInteger(1, data.length);

    let id = data[idx - 1].id; 

    if (id == questionId) {
      if (id < questionCount) {
        id++;
      }
      else {
        id--; 
      }
    }

    if (id == 0) {
      id = 1; 
    }

    console.log(id);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("id", id);
    urlParams.set("difficulty", difficulty);
    
    const newURL = window.location.pathname + '?' + urlParams.toString();
    window.history.pushState({ path: newURL }, '', newURL);

    setQuestionID(id);
    setShowQuestion(true);
  }

  const possibleLanguages = [ "Python", "JavaScript", "Haskell", "C++", "C#", "Assembly", "Java" ];
  const numColumns = 4; 
  const numRows = Math.ceil(possibleLanguages.length / numColumns);

  return (
      <main className="p-5 w-full h-screen flex flex-col justify-center items-center">
        <div className="w-[60%]">
          { showQuestion && 
            <div className="flex flex-col justify-center items-center">
              <TaskSnippet id={questionId} difficulty={difficulty} />
              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    getNewID();
                  }}
                  className="mt-4 shadow-[0_0px_30px_0] shadow-indigo-500/50 hover:shadow-red-500/50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full p-[2px] transform transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500 hover:via-red-500 hover:to-indigo-500">
                    <span className="flex w-full bg-gray-900 text-white rounded-full p-2 px-4">
                      Give me a question
                    </span>
                  </button>
                </div>
            </div>
          } 
          {
            !showQuestion && 
            <div className="flex flex-col justify-center items-center">
              <section className="mb-14">
                <h1 className="text-6xl">
                  Quickly get questions to test your 
                  <span className="text-glow text-indigo-100"> coding skills.
                  </span>
                </h1>
               
                <h2 className="text-xl mt-6">Select a difficulty or enter a playlist and start coding!</h2>
              </section>
              <div className="w-full border-2 border-slate-800 mb-6 rounded-xl">
                <div className="relative flex flex-row justify-between items-center h-full mb-8">
                  <button className="w-full bg-slate-800 m-1 rounded-lg h-8">Difficulty</button>
                  <button className="w-full bg-slate-800 m-1 rounded-lg h-8">Playlist</button>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <DifficultyButton difficulty={"Easy"} selected={difficulty} setDifficulty={updateDifficulty}/>
                  <DifficultyButton difficulty={"Medium"} selected={difficulty}  setDifficulty={updateDifficulty}/>
                  <DifficultyButton difficulty={"Hard"} selected={difficulty}  setDifficulty={updateDifficulty}/>
                </div>
                  <div className="mt-4 mb-8">
                       {
                        Array.from({ length: numRows }).map((_, rowIndex) => (
                        <div key={rowIndex} className="mt-2 flex justify-center items-center w-full gap-4">
                        {
                          possibleLanguages.slice(rowIndex * numColumns, (rowIndex + 1) * numColumns).map((lang, index) => {
                              return <LanguageButton key={lang} language={lang} selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages}></LanguageButton>
                            })
                        }
                        </div>
                        ))
                    }
                  </div>
                  {questionCount !== null && 
                    <div className="flex flex-row justify-center items-center mb-6">
                  
                    <button 
                    onClick={() => {
                      getNewID();
                    }}
                    className="shadow-[0_0px_30px_0] shadow-indigo-500/50 hover:shadow-red-500/50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full p-[2px] transform transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500 hover:via-red-500 hover:to-indigo-500">
                      <span className="flex w-full bg-gray-900 text-white rounded-full p-2 px-4">
                        Give me a question
                      </span>
                    </button>

                    </div>
                  }
              </div>

             
              {/* <hr className="w-[80%] border border-slate-800 mb-2"></hr> */}
              {/* <div className=" mb-14 w-[60%]">
                <input id="playlist" type="text" name="playlist" placeholder="playlist ID" required
                  className="mt-4 w-full rounded-xl h-10 outline-2 bg-[#212536] placeholder-slate-200 text-white p-2 border-transparent focus:ring-transparent focus:border-transparent focus:outline focus:outline-indigo-500 focus:outline-offset-2 focus:shadow-[0_0px_30px_0] focus:shadow-indigo-500/50 transition-shadow duration-200" />
              </div> */}
              
              

            </div>
            
          }
        </div>

        <footer className="absolute bottom-5">
          <div className="flex flex-row justify-center items-center">
            <p className="text-slate-500">You can view the source</p>
            <a href="https://github.com/Progalt/portfolio-react" className="ml-1 text-indigo-100 text-glow hover:text-white transition-all duration-150">here</a>
          </div>
        </footer>
      </main>
  );
}
