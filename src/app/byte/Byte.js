"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import Container from "../progui/Container";
import { useRouter } from "next/navigation";
import Skeleton from "../progui/Skeleton";
import LabelledCode from "../Components/LabelledCode";
import Button from "../progui/Button";
import CodeSnippet from "../progui/CodeSnippet";


export default function ByteProblem({ id, language }) {

    const supabase = createClient();
    const router = useRouter();
    const [ cachedID, setCachedID ] = useState(-1);
    const [ loaded, setLoaded ] = useState(false);
    const [ question , setQuestion ] = useState({
        text: "",
        input: "",
        output: "",
        codeSnippets: {}, 
    });
    const [ isRevealed, setIsRevealed] = useState(false);

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

                if (obj.language === language) {
                    acc[obj.language] = obj.source;
                }
                return acc;
                
                
              }, {});

              console.log(languageMap);

            

            setQuestion(
                {
                    text: q.text,
                    input: q.inputs,
                    output: q.outputs,
                    codeSnippets: languageMap
                }
            );
            
            setLoaded(true);
        }

        load();
    }, [cachedID] );

    useEffect(() => {
        if (id !== cachedID) {
            setCachedID(id);
        }
    }, [id])

    return (
        <Container className="p-3">
            {
                !loaded &&
                <>
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-[40%] h-6 my-2" />

                    <LabelledCode label="Input" copyButton={true} className="animate-pulse"></LabelledCode>
                    <LabelledCode label="Output" copyButton={false} className="animate-pulse"></LabelledCode>

                    <Button>Show Answer</Button>
                </>
            }
            {
                loaded && 
                <>
                    <h1 className="text-xl mb-2">{question.text}</h1>

                    <LabelledCode label="Input" copyButton={true}>{question.input}</LabelledCode>
                    <LabelledCode label="Output" copyButton={false}>{question.output}</LabelledCode>

                    { 
                        !isRevealed && 
                        <Button onClick={() => { setIsRevealed(true); }}>Show Answer</Button>
                    }
                    {
                        isRevealed && 
                        <CodeSnippet language={language.toLowerCase()}>
                            {question.codeSnippets[language].trim()}
                        </CodeSnippet>
                    }

                </>
            }
        </Container>
    )
}