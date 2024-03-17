"use server";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { SignIn } from "./signin";

export default async function SignInPage() {

    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (data.user) {
        redirect("/account");
    }

    return (
        <SignIn />
    )
}

