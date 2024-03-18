"use server";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { SignIn } from "./signin";

export default async function SignInPage() {

    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    // if the user is signed in we want to redirect to the account page 
    if (data.user) {
        redirect("/account");
    }

    return (
        <main className="flex justify-center items-center flex-col min-h-screen">
            <section className="w-[50%]">
                <section className="p-10 shadow-[0_0px_200px_30px] shadow-indigo-500/20 border-2 border-slate-800 rounded-xl">
                    <SignIn shouldRedirect={true} />
                </section>
            </section>
            
        </main>
    )
}

