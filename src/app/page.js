"use client";
import { StrictMode, useEffect, useRef, useState } from "react";
import { supabase } from "./Components/TaskSnippet";
import { DifficultyButton } from "./Components/DifficultyButton";
import { LanguageButton } from "./Components/LanguageButton";
import AnimateHeight from 'react-animate-height';
import { UserProvider, getRandomQuestion, getRandomQuestionID, useUser } from "./Backend/database";
import { IoPerson } from "react-icons/io5";
import { createClient } from "./utils/supabase/client";
import { useRouter } from "next/navigation";
import DropDown from "./Components/DropDown";
import { IconContext } from "react-icons";
import "./Styles.css";


function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {

  const [ difficulty, setDifficulty ] = useState("Easy");
  const [ selectedLanguages, setSelectedLanguages ] = useState([ "JavaScript" ]);
  const supabase = createClient();
  const router = useRouter();
  const [ isMobile, setmobile ] = useState(false);
  const [ isUserSignedIn, setUserSignedIn ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      let { data, error } = await supabase.auth.getUser();
        
      setUserSignedIn(data.user !== null);
    };

    fetchData(); // Call the fetchData function

  }, []);

  useEffect(() => {
    setmobile(!window.matchMedia("(min-width: 768px)").matches);
  })



  useEffect( () => {
    window.addEventListener('popstate', function(event) {

      window.location.reload();
    
  });
  });

 

  useEffect( () => {
    const urlParams = new URLSearchParams(window.location.search);

    

    if (urlParams.has("id")) {
      // We have an ID we want to pass it to the state 
      let id = Number(urlParams.get("id"));
      let diff = urlParams.get("difficulty");
      let langs = urlParams.get("lang");
      console.log(id);
      console.log(diff);
      console.log(langs);

      setSelectedLanguages([ langs ]);
      setQuestionID(id);
      setShowQuestion(true);
      setDifficulty(diff);

      
    }

  }, []);

  const updateDifficulty = (difficulty) => {
    
    setDifficulty(difficulty);
  }

  async function getNewID() {

    let data = await getRandomQuestion(difficulty, selectedLanguages);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("id", data.id);
    urlParams.set("difficulty", difficulty);
    urlParams.set("lang", selectedLanguages);
    
    const newURL = "/snip" + '?' + urlParams.toString();
    // window.history.pushState({ path: newURL }, '', newURL);

    // window.location.reload();

    router.push(newURL);
  }

  const possibleLanguages = [ "Python", "JavaScript", "Haskell" ];
  const numColumns = isMobile ? 2 : 3; 
  const numRows = Math.ceil(possibleLanguages.length / numColumns);

  return (
    <main className="w-full h-screen">
      <div className="p-5 flex flex-row justify-between gap-2">
        <div>
         
        </div>
        <div className="flex-shrink-0 flex flex-row gap-2">
          { !isUserSignedIn && <>
            <button onClick={ async () => {

        
            router.push("/signin");


            }} className="flex flex-row items-center justify-center rounded-lg bg-gradient-to-tr from-purple-500  to-indigo-500  p-2 px-6 transition-all duration-200 shadow-[0_0_30px_0px] shadow-indigo-500/50 hover:scale-110">

              <h1 className="font-bold">Sign In</h1>  
          
            </button>
            <button onClick={ async () => {


              router.push("/signin?t=register");


            }} className="flex flex-row items-center justify-center rounded-lg bg-gradient-to-tr from-purple-500  to-indigo-500  p-[2px] transition-all duration-200 shadow-[0_0_30px_0px] shadow-indigo-500/50 hover:scale-110">
              
              <div className="w-24 h-full bg-[#0a0a0f] flex justify-center items-center rounded-lg">
                <h1 className="font-bold text-glow">Register</h1>  
              </div>

            </button>
          </> }
          {
            isUserSignedIn && 
            <button onClick={ async () => {

        
              router.push("/account");
  
  
              }} className="flex flex-row items-center justify-center rounded-lg bg-gradient-to-tr from-purple-500  to-indigo-500  p-2 px-6 transition-all duration-200 shadow-[0_0_30px_0px] shadow-indigo-500/50 hover:scale-110">
  
                <h1 className="font-bold">Account</h1>  
            
            </button>
          }
          </div>
      </div>
      <div className="flex flex-col justify-between">
        <section className="px-5 md:mt-14 w-full flex flex-col justify-start md:justify-center items-center">
          
          <div className="w-full md:w-[80%] lg:w-[60%]">
              <section className="flex flex-col justify-center items-center">
                <header className="mb-6 md:mb-14">
                  <h1 className="text-4xl md:text-6xl font-bold">
                    Quickly get problems to test your 
                    <span className="text-glow text-indigo-100"> coding skills.
                    </span>
                  </h1>
                
                  <h2 className="md:text-xl mt-8 text-slate-300">Select a difficulty and a language and start coding!</h2>
                </header>
                <section 
                className={`w-full  mb-6 p-1 pt-5`}>
                  <article>
                    <nav className="md:mx-10 mb-10">
                      <DropDown options={["Easy" ,"Medium", "Hard"]} 
                      closeOnSelect={true}
                      defaultOption="Easy"
                      onSelect={(option) =>{
                        updateDifficulty(option);
                      } } />
                    </nav>
                    <section className="mt-4 mb-8 mx-1">
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
                    </section>
                      
                  </article>
                  
                  <div className="flex flex-row justify-center items-center p-5">
                
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
                         
                </section>
              
              </section>
          </div>

        </section>
      <footer className="flex-shrink-0 mb-4">
          <section className="flex flex-row justify-center items-center">
            <p className="text-slate-500">You can view the source</p>
            <a href="https://github.com/Progalt/portfolio-react" target="_blank" className="ml-1 text-indigo-200 text-glow hover:text-white transition-all duration-150">here</a>
          </section>
        </footer>
      </div>
     
    </main>
  );
}
