
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import SignOutButton from "./signOutButton";


export default async function Account() {

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (!data.user) {
        redirect("/signin");
    }
   
    return (
        <div className="min-h-screen flex justify-center items-center">
            <section className="p-4 w-full h-fit m-4 border-2 border-slate-800 rounded-lg shadow-[0_0px_200px_30px] shadow-indigo-500/20">
                <h1 className="text-2xl">Hi <span className="text-glow">{data.user.email}</span></h1>
                <div className="flex flex-row justify-end items-center pt-1 mt-4">
                    <SignOutButton />
                </div>
            </section>
        </div>
    )
}