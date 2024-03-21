"use client";
import { useEffect, useState } from "react";
import DropDown from "./Components/DropDown";
import { LanguageButton } from "./Components/LanguageButton";
import NewQuestion from "./Components/NewQuestion";



export default function HomeClient() {

    const [ difficulty, setDifficulty ] = useState("Easy");
    const [ selectedLanguages, setSelectedLanguages ] = useState([ "JavaScript" ]);
    const [ isMobile, setmobile ] = useState(false);

    useEffect(() => {
        setmobile(!window.matchMedia("(min-width: 768px)").matches);
      })
    
     

    const updateDifficulty = (difficulty) => {
    
    setDifficulty(difficulty);
    }

    const possibleLanguages = [ "Python", "JavaScript", "Haskell" ];
    const numColumns = isMobile ? 2 : 3; 
    const numRows = Math.ceil(possibleLanguages.length / numColumns);
 
    return (
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
                    <NewQuestion difficulty={difficulty} selectedLanguages={selectedLanguages}/>
                </div>
                         
        </section>
    );
}