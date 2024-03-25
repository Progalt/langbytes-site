import "./Styles.css";
import UserNav from "./Components/UserNav";
import HomeClient from "./homeClient";

import { Source_Code_Pro } from 'next/font/google'

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
})
 
export default async function Home() {

  return (
    <main className="w-full min-h-screen flex flex-col relative">
      <div className="background-svg opacity-40 md:opacity-30 bg-[length:200%] md:bg-[length:120%]" />
      <UserNav/>
      <div className="flex flex-col flex-grow justify-between transition-transform duration-150">
        <section className="px-5 md:mt-14 w-full flex flex-col justify-start items-center">
          
          <div className="w-full md:w-[80%] lg:w-[70%] 2xl:w-[40%]">
              <section className="flex flex-col justify-center items-center">
                <header className=" mt-10 md:mb-14">
                  <h1 className="text-4xl md:text-6xl font-semibold">
                    Quickly get problems to test your
                    <span className={"font-extrabold text-indigo-500 bg-gradient-to-b from-purple-500 to-indigo-500 text-transparent bg-clip-text"}> coding skills.
                    </span>
                  </h1>
                
                  <h2 className="md:text-xl text-lg mt-8 text-slate-300 font-light">Select a difficulty and a language and start coding!</h2>
                 
                </header>

                <HomeClient />
                         
              </section>
          </div>

          <article className="w-full h-full md:w-[80%] lg:w-[70%] 2xl:w-[40%] mt-24 p-5 py-8  rounded-xl">
            <section className="">
              <h3 className="mb-2 text-[#FF705B] italic font-semibold">Fancy a challenge?</h3>
              <h2 className="text-3xl md:text-4xl font-semibold">Complete a <span className="font-extrabold  bg-gradient-to-b from-[#FFB457] to-[#FF705B] text-transparent bg-clip-text">Daily challenge.</span></h2>
              <h3 className="mt-5 font-light md:text-xl text-slate-300 text-lg">
                Take on a fresh challenge daily that isn&apos;t in the main question pool.
              </h3>
              <p className="mt-3 text-slate-300 font-light">Questions are new for the day then get added to the question pool so you can always come back to it later.</p>
            </section>
            
            <section className="mt-10 mb-10 flex flex-row justify-center items-center">
              <div className="border-2 border-slate-800 rounded-xl shadow-[0_0_20px_0] shadow-indigo-500/50 p-2 px-8 bg-[#13131d] font-semibold">Coming Soon</div>
            </section>
          </article>

          <section>

          </section>

        </section>
      <footer className="flex-shrink-0 mb-4 mt-4">
          <section className="flex flex-row justify-center items-center">
            <p className="text-slate-500">You can view the source on</p>
            <a href="https://github.com/Progalt/portfolio-react" target="_blank" className="ml-1 text-indigo-400 hover:text-white transition-all duration-150">Github</a>
          </section>
          <p className="mt-3 flex flex-row justify-center items-center text-slate-500 text-sm">Copyright © 2024, Henry Gronow</p>
        </footer>
      </div>
     
    </main>
  );
}
