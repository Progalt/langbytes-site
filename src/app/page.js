"use client";
import { useEffect, useState } from "react";
import { TaskSnippet, supabase } from "./Components/TaskSnippet";
import { IoPerson } from "react-icons/io5";
import { DifficultyButton } from "./Components/DifficultyButton";
import { Modal } from "./Components/Modal";

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {

  const [ showQuestion, setShowQuestion ] = useState(false);
  const [ questionId, setQuestionID ] = useState(0);
  const [ difficulty, setDifficulty ] = useState("Medium");
  const [ questionCount, setQuestionCount] = useState(null);

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

  return (
      <main className="p-5 w-full h-screen flex flex-col justify-center items-center">
        <div className="w-[60%]">
          { showQuestion && 
            <div className="flex flex-col justify-center items-center">
              <TaskSnippet id={questionId} difficulty={difficulty} />
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
          } 
          {
            !showQuestion && 
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl mb-24">wadasdd</h1>
              <div className="flex flex-row justify-center items-center mb-4">
                <DifficultyButton difficulty={"Easy"} selected={difficulty} setDifficulty={updateDifficulty}/>
                <DifficultyButton difficulty={"Medium"} selected={difficulty}  setDifficulty={updateDifficulty}/>
                <DifficultyButton difficulty={"Hard"} selected={difficulty}  setDifficulty={updateDifficulty}/>
              </div>
              
              {questionCount !== null && 
                <div className="flex flex-row justify-center items-center">
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
            
          }
        </div>
        {/* <div className="absolute top-0 right-0 mt-4 mr-10">
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex justify-center items-center">
            <IoPerson className="text-2xl"/>
          </div>
        </div> */}

        <footer className="absolute bottom-5">
          <div className="flex flex-row justify-center items-center">
            <p className="text-slate-500">You can view the source</p>
            <a href="https://github.com/Progalt/portfolio-react" className="ml-1 text-indigo-500 text-glow hover:text-white transition-all duration-150">here</a>
          </div>
        </footer>
      </main>
  );
}
