"use client";
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { FaRegCopy } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite, MdOutlinePlaylistAdd   } from "react-icons/md";

import { createClient } from '@supabase/supabase-js'
import { Tooltip } from './Tooltip';

export const supabase = createClient("https://qlfmizzkgfwibxvrfoja.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZm1penprZ2Z3aWJ4dnJmb2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxOTEwMDgsImV4cCI6MjAyNTc2NzAwOH0.74EX28xtvNqxzk_DfXHTEJbHlkhZDWsztThPc_1hG48")

function LanguageButton({ name, setSelectedLanguage, selectedLang }) {
    return (
        <button onClick={() => { setSelectedLanguage(name) }}
        className={`mx-[0.15em] text-sm px-2 rounded-lg border-2 border-slate-800`}
        style={{
            backgroundColor: name == selectedLang ? '#292a37' : '#17181f'
        }}>
            {name}
        </button>
    )
}

export function TaskSnippet({ id, difficulty }) {

    
    const [isRevealed, setIsRevealed] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
    const [isFavourited, setFavourited] = useState(false);
    const [cachedID, setCachedID] = useState(-1);

    const [ question , setQuestion ] = useState({
        text: "",
        input: "",
        output: "",
        codeSnippets: {}, 
    });

    useEffect(() => {
        async function load() {
            let { data: q, error } = await supabase
            .from('question')
            .select("*")
            .eq("id", id)
            .single(); 

            let { data: snips, errorSol } = await supabase
            .from("solution")
            .select("*")
            .eq("question_id", id);

            //console.log(q);
            //onsole.log(snips);

            const languageMap = snips.reduce((acc, obj) => {
                acc[obj.language] = obj.source;
                return acc;
              }, {});

            //console.log(languageMap);

             setQuestion(
                {
                    text: q.text,
                    input: q.inputs,
                    output: q.outputs,
                    codeSnippets: languageMap
                }
             );

            
            //console.log(question);
        }

        if (cachedID != id) {
            
            setCachedID(id);

            // We also want to then load the question from the db 

            load(); 
        }
        console.log(id);
    }, [id, cachedID, selectedLanguage]);

    useEffect(() => {
        setIsRevealed(false);
        console.log(question);
    }, [question]);


    // const questionText = "Write a function that returns the square of each element in an array.";
    // const input = "[2, 4, 8]";
    // const output = "[4, 16, 64]";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(input)
        .then(() => {
            console.log("Copied inputs to clipboard: ", input);
        })
        .catch((err) => {
            console.log("Failed to copy inputs to clipboard: ", err);
        });
    };

    const favourite = () => {
        setFavourited(!isFavourited);
    };

    const revealAnswer = () => {
        const [[firstKey, firstValue]] = Object.entries(question.codeSnippets);

        if (!question.codeSnippets.hasOwnProperty(selectedLanguage)) {
            setSelectedLanguage(firstKey);
        }

        setIsRevealed(true);
    };

    return (
        <section className={`bg-[#13131d] shadow-[0_0px_200px_30px] shadow-indigo-500/20 border-2 border-slate-800 w-full rounded-lg p-4`}
        style={{
          }}>
            <p className="font-light text-xl mb-3">
                {question.text}
            </p>
            <div className="flex flex-row justify-between items-center mb-2">
                <div className="px-4 border-2 border-slate-800 rounded-full">
                    {difficulty}
                </div>
                <div className="flex flex-shrink-0 text-2xl">
                    <Tooltip text="Add to list">
                        <button className="mr-4"
                        onClick={() => {}}>
                            <MdOutlinePlaylistAdd className="text-white hover:text-indigo-500 transition-all duration-200"/>
                        </button>
                    </Tooltip>
                    <Tooltip text="Favourite">
                        <button
                        onClick={favourite}>
                            { !isFavourited && <MdFavoriteBorder className="text-white hover:text-indigo-500 transition-all duration-200" /> } 
                            { isFavourited && <MdFavorite className="text-indigo-500" /> }
                        </button>
                    </Tooltip>
                </div>
            </div>
            <hr className="border border-slate-800 mb-2"></hr>
            <p className="font-light text-lg">Input: </p>
            <div className="flex flex-row justify-between items-center">
                <code>{question.input}</code>
                <Tooltip text="Copy inputs">
                    <button className="flex-shrink-0 text-xl text-white hover:text-indigo-500 transition-all duration-100" onClick={copyToClipboard}>
                        <FaRegCopy/>
                    </button>
                </Tooltip>
            </div>
            <p className="font-light text-lg">Output: </p>
            <code>{question.output}</code>
            <br />
            <div className="flex justify-end">
            { !isRevealed && 
               <button 
               onClick={() => {
                    revealAnswer();
               }}
               className="shadow-[0_0px_30px_0] shadow-indigo-500/50 hover:shadow-red-500/50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg p-[2px] transform transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:via-red-500 hover:to-indigo-500">
                 <span className="flex w-full bg-gray-900 text-white rounded-lg p-2 px-4">
                   Reveal Answer
                 </span>
               </button>
            } 
            </div>
            
            { isRevealed && <div className="mt-4 ">
                <div className="flex flex-row">
                    {Object.keys(question.codeSnippets).map((lang, index) => (
                        <LanguageButton
                        key={index}
                        name={lang}
                        selectedLang={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        />
                    ))}
                </div>
                <SyntaxHighlighter language={selectedLanguage.toLowerCase()} style={dracula}>
                    {question.codeSnippets[selectedLanguage].trim()}
                </SyntaxHighlighter>

               

            </div> } 
            
        </section>
    );
}