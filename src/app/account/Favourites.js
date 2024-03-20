"use client";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import Snippet from "./Snippet";


export default function Favourites() {

    const supabase = createClient();

    const [ favourites, setFavourites ] = useState([]);

    // Assume true to begin with
    const [ hasFavourites, setHasFavourites ] = useState(true);

    useEffect(() => {

        async function getFavourites() {
            
            // We assume the user is signed in
            // They should never even see this page if they aren't signed in 
            let user = (await supabase.auth.getUser()).data.user;

            // first get the favourites list
            const { data: list, error: list_error } = await supabase
                .from("list")
                .select("id")
                .eq("user_id", user.id)
                .eq("is_favourites", true)
                .single();

            const { data: entries, error: e_error } = await supabase
                .from("list_entry")
                .select("question_id")
                .eq("list_id", list.id);
            
            const questionIds = entries.map(entry => entry.question_id);
            
            const { data: questions, error: q_error } = await supabase
                .from("question")
                .select("id, text, difficulty")
                .in("id", questionIds);

            console.log(questions);
            
            setFavourites(questions);

            setHasFavourites(true);
        }

        getFavourites();

    }, []);

    return (
        <>
            { hasFavourites && favourites && 
                favourites.map((value, index) => {
                    return <Snippet 
                        key={"fav" + value.id} 
                        id={value.id} 
                        difficulty={value.difficulty} 
                        title={value.text} />
                })
            }
        </>
    )
}