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
                <SignIn  shouldRedirect={true} />
            </section>
            
        </main>
    )
}

