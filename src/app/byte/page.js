
import { TaskSnippet } from "../Components/TaskSnippet";
import ByteProblem from "./Byte";
import OptionBar from "./OptionBar";




export default function Byte({ params, searchParams }) {


    


    return (
        <main className="w-screen min-h-screen flex flex-col relative">
            
            <div className="absolute -z-50 h-full w-full bg-black  bg-grid-white/[0.15]">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(circle_at_center,transparent_5%,black_80%)]" />
            </div >

            {/* <Button href="/">Home</Button> */}
            
            <section className="mx-auto my-auto w-full max-w-full md:max-w-[60%] xl:max-w-[40%] 2xl:max-w-[30%]">
                <OptionBar questionID={searchParams.id}/>
                <ByteProblem id={searchParams.id} language={searchParams.lang}/>
               
            </section>

        </main>
    );
}