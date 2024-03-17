
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { SignIn } from "./signin";

export default async function SignInPage() {
    "use server";

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser()

    // This auto redirects to sign in if the user is not logged in 
    if (data.user !== null) {
        redirect("/account");
    }


    return (
        <SignIn />
    )
}

