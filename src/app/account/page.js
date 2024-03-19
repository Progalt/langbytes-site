
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
        <div className="min-h-screen">
            <nav className="flex flex-row justify-between items-center p-5">
                <SignOutButton />
            </nav>
           
        </div>
    )
}