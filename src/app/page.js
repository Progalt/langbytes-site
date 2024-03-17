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


function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {

  const [ difficulty, setDifficulty ] = useState("Medium");
  const [ selectedLanguages, setSelectedLanguages ] = useState([ "JavaScript" ]);
  const [ playlistSelected, setPlayListSelected] = useState(false);
  const [height, setHeight] = useState('auto');
  const contentDiv = useRef(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const element = contentDiv.current;

    const resizeObserver = new ResizeObserver(() => {
      setHeight(element.clientHeight);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ ]);

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
    console.log(difficulty);
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
  const numColumns = 3; 
  const numRows = Math.ceil(possibleLanguages.length / numColumns);

  return (
      <main className="p-5 w-full h-screen flex flex-col justify-center items-center">
        <div className="w-full md:w-[60%]">
            <section className="flex flex-col justify-center items-center pt-10 md:pt-0">
              <header className="mb-14">
                <h1 className="text-4xl md:text-6xl">
                  Quickly get questions to test your 
                  <span className="text-glow text-indigo-100"> coding skills.
                  </span>
                </h1>
               
                <h2 className="md:text-xl mt-6">Select a difficulty or enter a playlist and start coding!</h2>
              </header>
              <AnimateHeight 
              height={height}
              contentClassName="auto-content"
              contentRef={contentDiv}
              disableDisplayNone
              className={`w-full border-2 border-slate-800 mb-6 p-1 rounded-xl shadow-[0_0px_200px_30px] shadow-indigo-500/20 transition-all duration-300 ease-in-out`}>
                <nav className="relative flex flex-row justify-between items-center h-full mb-8">
                  <div 
                  className={`absolute top-0 w-[50%] h-10 border-2 border-indigo-500 shadow-[0_0px_20px_0px] shadow-indigo-700 bg-transparent transition-all duration-300 ease-in-out rounded-xl ${playlistSelected ? "left-[50%]" : "left-0"}`} />
                  <button className="w-full bg-[#212536] m-1 rounded-lg h-8" onClick={() => {setPlayListSelected(false); }}>Difficulty</button>
                  <button className="w-full bg-[#212536] m-1 rounded-lg h-8" onClick={() => {setPlayListSelected(true); }}>Playlist</button>
                </nav>
                { !playlistSelected && 
                <div>
                  <nav className="flex flex-col md:flex-row justify-center items-center">
                    <DifficultyButton difficulty={"Easy"} selected={difficulty} setDifficulty={updateDifficulty}/>
                    <DifficultyButton difficulty={"Medium"} selected={difficulty}  setDifficulty={updateDifficulty}/>
                    <DifficultyButton difficulty={"Hard"} selected={difficulty}  setDifficulty={updateDifficulty}/>
                  </nav>
                    <div className="mt-4 mb-8 mx-1">
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
                    
                  </div>
                  }
                  {
                    playlistSelected && 
                    <div className=" mb-14 w-full flex justify-center">
                      <div className="w-[60%]">
                        <input id="playlist" type="text" name="playlist" placeholder="playlist ID" required
                          className="mt-4 w-full rounded-xl h-10 outline-2 bg-[#212536] placeholder-slate-200 text-white p-2 border-transparent focus:ring-transparent focus:border-transparent focus:outline focus:outline-indigo-500 focus:outline-offset-2 focus:shadow-[0_0px_30px_0] focus:shadow-indigo-500/50 transition-shadow duration-200" />
                      </div>
                    </div> 
                  }
                 
                    <div className="flex flex-row justify-center items-center p-10 pt-1">
                  
                    <button 
                    onClick={() => {
                      getNewID();
                    }}
                    className="shadow-[0_0px_30px_0] shadow-indigo-500/50 hover:shadow-red-500/50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full p-[2px] transform transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500 hover:via-red-500 hover:to-indigo-500">
                      <span className="flex w-full bg-gray-900 text-white rounded-full p-2 px-4">
                        { playlistSelected ? "Start playlist" : "Give me a question" }
                      </span>
                    </button>

                    </div>
                  
                    
              </AnimateHeight>
              
            
            </section>
        </div>

        <button onClick={ async () => {
          
          const { data, error } = await supabase.auth.getUser();

          if (data.user !== null) {
            router.push("/account");
            return;
          }

          router.push("/signin");


        }} className="absolute right-5 top-5 rounded-full w-12 h-12 border-2 border-indigo-500 shadow-[0_0px_30px_0] shadow-indigo-500/50 flex justify-center items-center transition-all duration-200 hover:scale-110">
            <IoPerson className="text-2xl"/>
        </button>
        

        <footer className="absolute bottom-5">
          <div className="flex flex-row justify-center items-center">
            <p className="text-slate-500">You can view the source</p>
            <a href="https://github.com/Progalt/portfolio-react" className="ml-1 text-indigo-100 text-glow hover:text-white transition-all duration-150">here</a>
          </div>
        </footer>
      </main>
  );
}
