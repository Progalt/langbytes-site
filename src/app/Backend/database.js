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