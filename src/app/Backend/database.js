import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
export async function getRandomQuestionID(difficulty, selectedLanguages) {
    const supabase = createClient();
    
    console.log("Finding random question");

    const { data: questions, error } = await supabase
        .from('question')
        .select(`id, solution (id, language)`)
        .eq('difficulty', difficulty)
        .in("solution.language", selectedLanguages);

    console.log(questions);

    let x = getRandomInteger(0, questions.length - 1);

    return questions[x].id;
}

export async function getRandomQuestion(difficulty_arg, language_arg) {
    // this is a much better method than the previous getRandomQuestionID 
    // this handles it all on the server using database functions 
    const supabase = createClient();


    const { data, error } = await supabase.rpc("get_random_solution", 
        { difficulty_arg: difficulty_arg, language_arg: language_arg[0]  }).select();


    return data; 
}

export async function isSignedIn() {
    const supabase = createClient();
    return await supabase.auth.getUser() !== null; 
}