"use client"

import { HiHome,HiShare,HiHeart, HiOutlineHeart } from "react-icons/hi"
import Button from "../progui/Button"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";
import Container from "../progui/Container";
import { createClient } from "../utils/supabase/client";



export default function OptionBar({ questionID }) {

    const [isOpen, setIsOpen] = useState(false);
    const [ isFavourited, setFavourited ] = useState(false);
    const [ shake, setShake ] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        async function load() {
           
            // see if its a favourited question
            
            let user = (await supabase.auth.getUser()).data.user;
            let signedIn = (user !== null);

            if (signedIn) {
                // if the user is signed in 

                const { data, error } = await supabase
                        .rpc("get_lists_for_question", { question_id: questionID, user_id: user.id});
                    
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

        }

        load();

    }, [questionID]);

    const openShareModal = () => {
        setIsOpen(true);
        navigator.clipboard.writeText(window.location.href).then(
            () => {
                console.log("Copied link to clipboard: ", window.location.href);
            }
        );
        setTimeout(() => { setIsOpen(false); }, 1500);
    }

    const favourite = async () => {
        
        let user = (await supabase.auth.getUser()).data.user;
        let signedIn = (user !== null)

        if (!signedIn) {
            console.log("Not Signed in");
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
                    
                
                    await supabase.from("list_entry").insert({ list_id: data.id, question_id: questionID });
                
                    
                }
                else {
                     await supabase.from("list_entry").insert({ list_id: data.id, question_id: questionID });
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
                        .eq("question_id", questionID)
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

    return (
        <>
            <motion.div
            initial={{ top: -120 }}
            animate={{ top: isOpen ? 10 : -120 }}
            className="z-50 w-full md:w-auto absolute left-1/2 transform -translate-x-1/2 ">
                <Container className=" flex flex-row items-center p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M4.606 12.97a.75.75 0 0 1-.134 1.051 2.494 2.494 0 0 0-.93 2.437 2.494 2.494 0 0 0 2.437-.93.75.75 0 1 1 1.186.918 3.995 3.995 0 0 1-4.482 1.332.75.75 0 0 1-.461-.461 3.994 3.994 0 0 1 1.332-4.482.75.75 0 0 1 1.052.134Z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M5.752 12A13.07 13.07 0 0 0 8 14.248v4.002c0 .414.336.75.75.75a5 5 0 0 0 4.797-6.414 12.984 12.984 0 0 0 5.45-10.848.75.75 0 0 0-.735-.735 12.984 12.984 0 0 0-10.849 5.45A5 5 0 0 0 1 11.25c.001.414.337.75.751.75h4.002ZM13 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clip-rule="evenodd" />
                    </svg>

                    <h1 className="pl-4 font-semibold">Byte link has been copied to clipboard!</h1>

                </Container>
            </motion.div>
            <nav className="relative flex flex-row my-2 mx-2 md:mx-0 gap-2">
                <Button href="/"><HiHome className="text-2xl"/></Button>
                <Button onClick={openShareModal}><HiShare className="text-2xl"/></Button>
                <motion.div>
                    <Button onClick={favourite  }>
                        {
                            isFavourited && 
                            <HiHeart className="text-2xl"/>
                        }
                        {
                            !isFavourited && 
                            <HiOutlineHeart className="text-2xl"/>
                        }
                    </Button>
                </motion.div>

            </nav>
        </>
    )
}