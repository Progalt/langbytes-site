"use client";
import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { FaRegCopy } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite, MdOutlinePlaylistAdd   } from "react-icons/md";
import { BiShare } from "react-icons/bi";
import { Tooltip } from './Tooltip';
import { createClient } from '../utils/supabase/client';
import { SignIn } from '../signin/signin';
import { Modal } from './Modal';
import { isSignedIn } from '../Backend/database';
import { useRouter } from 'next/navigation';
import LabelledCode from './LabelledCode';
import { AnimatePresence, motion } from "framer-motion"
import CodeSnippet from '../progui/CodeSnippet';

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
    const supabase = createClient();
    const router = useRouter();
    

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
                //console.log(error);
                router.push("/error")
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
                else {
                    setFavourited(false);
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


    const share = () => {
        navigator.clipboard.writeText(window.location.href).then(
            () => {
                console.log("Copied link to clipboard: ", window.location.href);
            }
        )
        
    }

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
                if (data === null) {
                    console.log("Creating a new favourites list");

                    const { data, err } = await supabase.from("list").insert(
                        { 
                            name: "favourites", 
                            user_id: user.id, 
                            is_favourites: true 
                        }).select().single();

                    if (err) { 
                        console.log(err);
                    }
                    
                
                    await supabase.from("list_entry").insert({ list_id: data.id, question_id: id });
                
                    
                }
                else {
                     await supabase.from("list_entry").insert({ list_id: data.id, question_id: id });
                }

                
                console.log("Favourited");
                //const { error } = await supabase.from("list_entry").insert({ list_id: ,question_id: id })

                setFavourited(true);
            }
            else {

                // we want to remove it

                console.log("Unfavourited");

                const { data, err } = await supabase.from("list")
                    .select("*")
                    .eq("user_id", user.id)
                    .eq("name", "favourites").single();

                if (data !== null) {


                    const { error } = await supabase
                        .from("list_entry")
                        .delete()
                        .eq("question_id", id)
                        .eq("list_id", data.id);
                    
                    if (error) {
                        console.log(error);
                        return;
                    }
                    

                    setFavourited(false);
                }
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
        <AnimatePresence>
            <motion.div className={`bg-[#13131d] overflow-hidden border-2 border-[#232333] w-full rounded-lg p-4`}
                animate={{ height: "auto"}}
                transition={{ duration: 1 }}>
                {   
                    isLoaded && 
                    <motion.div
                    animate={{ height: "auto"}}
                    transition={{ duration: 1 }}>
                        <p className="font-light text-xl mb-3">
                            {question.text}
                        </p>
                        <div className="flex flex-row justify-between items-center mb-2">
                            <div className="px-4 border-2 border-[#232333] rounded-full">
                                {difficulty}
                            </div>
                            <div className="flex flex-shrink-0 text-2xl mr-5">
                                {/* <Tooltip text="Add to list">
                                    <button className="mr-4"
                                    onClick={addToList}>
                                        <MdOutlinePlaylistAdd className="text-white hover:text-indigo-500 transition-all duration-200"/>
                                    </button>
                                </Tooltip> */}
                                <Tooltip text="Share">
                                    <button className="mr-4"
                                    onClick={share}>
                                      <BiShare className="text-white hover:text-indigo-500 transition-all duration-200"/>
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
                        <hr className="border border-[#232333] mb-2"></hr>

                        <LabelledCode label="Input:" copyButton={true}>{question.input}</LabelledCode>
                        <LabelledCode label="Output:" copyButton={false}>{question.output}</LabelledCode>

                        <div className={`flex justify-end ${!isRevealed ? "" : ""}`}>
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
                            {/* <SyntaxHighlighter language={selectedLanguageCode.toLowerCase()} style={dracula}>
                                {question.codeSnippets[selectedLanguageCode].trim()}
                            </SyntaxHighlighter> */}
                            <CodeSnippet className="mt-4" language={selectedLanguageCode.toLowerCase()}>
                                {question.codeSnippets[selectedLanguageCode].trim()}
                            </CodeSnippet>

                        

                        </div> } 
                </motion.div>
            }
            </motion.div>
            
          
       
            </AnimatePresence>
        </>
    );
}