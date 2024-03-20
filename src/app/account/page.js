
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import SignOutButton from "./signOutButton";
import BackHomebutton from "../signin/homeButton";
import Snippet from "./Snippet";
import Favourites from "./Favourites";


export default async function Account() {

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (!data.user) {
        redirect("/signin");
    }
   
    return (
        <main className="min-h-screen">
            <nav className="flex flex-row justify-end items-center p-5">
                <nav className="flex flex-row gap-2">
                    <BackHomebutton />
                    <SignOutButton />
                </nav>
            </nav>
            <section className="flex flex-col items-center">
                <article className="mx-4 border-2 border-slate-800 rounded-lg p-5 lg:w-[70%]">
                        <h1 className="text-glow text-2xl mb-3">Favourites</h1>
                        <hr className="mb-5 border-[1.5px] border-slate-800 rounded-full"/>
                        <Favourites />
                </article>
           </section>
        </main>
    )
}