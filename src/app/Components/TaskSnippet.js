"use client";
import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { FaRegCopy } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite, MdOutlinePlaylistAdd   } from "react-icons/md";

import { Tooltip } from './Tooltip';
import AnimateHeight from 'react-animate-height';
import { createClient } from '../utils/supabase/client';
import { SignIn } from '../signin/signin';
import { Modal } from './Modal';
import { isSignedIn } from '../Backend/database';

export const knownLanguages = [
    "JavaScript",
    "Python",
    "Haskell"
];

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

export function TaskSnippet({ id, difficulty, selectedLanguages, onNotSignedIn }) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [selectedLanguageCode, setSelectedLanguageCode] = useState("");
    const [isFavourited, setFavourited] = useState(false);
    const [cachedID, setCachedID] = useState(-1);
    const [height, setHeight] = useState('auto');
    const contentDiv = useRef(null);
    const supabase = createClient();

    useEffect(() => {
        const element = contentDiv.current;

        const resizeObserver = new ResizeObserver(() => {
        setHeight(element.clientHeight);
        });

        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, []);

    

    const [ question , setQuestion ] = useState({
        text: "",
        input: "",
        output: "",
        codeSnippets: {}, 
    });



    useEffect(() => {
        async function load() {
            console.log("Loading Question from database: " + id);
            let { data: q, error } = await supabase
            .from('question')
            .select("*")
            .eq("id", id)
            .single(); 

            if (q === null) {
                console.log(error);
                return;
            }

            let { data: snips, errorSol } = await supabase
            .from("solution")
            .select("*")
            .eq("question_id", id);


            const languageMap = snips.reduce((acc, obj) => {
              
                acc[obj.language] = obj.source;
                return acc;
                
                
              }, {});

            

             setQuestion(
                {
                    text: q.text,
                    input: q.inputs,
                    output: q.outputs,
                    codeSnippets: languageMap
                }
             );
            
            // test if its a favourited question
            
            let user = (await supabase.auth.getUser()).data.user;
            let signedIn = (user !== null);

            if (signedIn) {
                // if the user is signed in 

                const { data, error } = await supabase
                        .rpc("get_lists_for_question", { question_id: id, user_id: user.id});

                console.log(data);

                if (data.id !== null) {
                    if (Array.isArray(data)) {
                        for (let i = 0; i < data.length; i++) {
                            if (i.is_favourites) {
                                setFavourited(true);
                            }
                        }
                    }
                    else {
                        if (data.is_favourites) {
                            setFavourited(true);
                        }
                    }
                }
            } 
            else {
                setFavourited(false);
            }
            
            //console.log(question);

            setIsLoaded(true);
        }

        if (cachedID != id) {
            
            setCachedID(id);
            setIsRevealed(false);

            load(); 
        }
        console.log(id);
    }, [ id, cachedID ]);


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

    const favourite = async () => {
        
        let user = (await supabase.auth.getUser()).data.user;
        let signedIn = (user !== null)

        if (!signedIn) {
            onNotSignedIn();
        }
        else {
            
            // TODO: Secure this

            if (isFavourited !== true) {

                const { data, err } = await supabase.from("list")
                    .select("*")
                    .eq("user_id", user.id)
                    .eq("name", "favourites").single();

               
                // Create a new entry if it doesn't exist
                if (data.length === 0) {
                    console.log("Creating a new favourites list");

                    const { data, err } = await supabase.from("list").insert(
                        { 
                            name: "favourites", 
                            user_id: user.id, 
                            is_favourites: true 
                        }).select().single();
                    
                
                    await supabase.from("list_entry").insert({ list_id: data.id, question_id: id });
                
                    
                }
                else {
                    await supabase.from("list_entry").insert({ list_id: data.id, question_id: id });
                }

                

                //const { error } = await supabase.from("list_entry").insert({ list_id: ,question_id: id })

                setFavourited(true);
            }
            else {

                // we want to remove it

                

                setFavourited(false);
            }
        }
    };

    const addToList = async () => {
        let signedIn = ((await supabase.auth.getUser()).data.user !== null)

        if (!signedIn) {
            onNotSignedIn();
        }
    }

    const revealAnswer = () => {
        if (selectedLanguageCode === "" || !knownLanguages.includes(selectedLanguageCode)) {
            setSelectedLanguageCode("JavaScript");
            setIsRevealed(true);
            return;
        }
        const [[firstKey, firstValue]] = Object.entries(question.codeSnippets);

        
        if (!question.codeSnippets.hasOwnProperty(selectedLanguageCode)) {
            setSelectedLanguage(firstKey);
        }

        setIsRevealed(true);
    };

    return (
        <>
            <AnimateHeight className={`bg-[#13131d] overflow-visible shadow-[0_0px_200px_30px] shadow-indigo-500/20 border-2 border-slate-800 w-full rounded-lg p-4`}
                height={height}
                contentClassName="auto-content"
                contentRef={contentDiv}
                disableDisplayNone>
                {   
                    isLoaded && 
                    <div>
                        <p className="font-light text-xl mb-3">
                            {question.text}
                        </p>
                        <div className="flex flex-row justify-between items-center mb-2">
                            <div className="px-4 border-2 border-slate-800 rounded-full">
                                {difficulty}
                            </div>
                            <div className="flex flex-shrink-0 text-2xl mr-5">
                                <Tooltip text="Add to list">
                                    <button className="mr-4"
                                    onClick={addToList}>
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
                        <div className="flex flex-row justify-between items-center mr-5">
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
                        <div className={`flex justify-end ${!isRevealed ? "pb-10" : ""}`}>
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
                        
                        { isRevealed && <div className="mt-4 pb-7">
                            <div className="flex flex-row">
                                {Object.keys(question.codeSnippets).map((lang, index) => (
                                    <LanguageButton
                                    key={index}
                                    name={lang}
                                    selectedLang={selectedLanguageCode}
                                    setSelectedLanguage={setSelectedLanguageCode}
                                    />
                                ))}
                            </div>
                            <SyntaxHighlighter language={selectedLanguageCode.toLowerCase()} style={dracula}>
                                {question.codeSnippets[selectedLanguageCode].trim()}
                            </SyntaxHighlighter>

                        

                        </div> } 
                </div>
            }
            </AnimateHeight>
            
          
       
            
        </>
    );
}