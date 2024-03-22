"use server";
import "./Styles.css";
import UserNav from "./Components/UserNav";
import HomeClient from "./homeClient";


export default async function Home() {


  return (
    <main className="w-screen min-h-screen flex flex-col">
      <UserNav/>
      <div className="flex flex-col flex-grow justify-between">
        <section className="px-5 md:mt-14 w-full flex flex-col justify-start md:justify-center items-center">
          
          <div className="w-full md:w-[80%] lg:w-[60%]">
              <section className="flex flex-col justify-center items-center">
                <header className="mb-6 md:mb-14">
                  <h1 className="text-4xl md:text-6xl font-semibold">
                    Quickly get problems to test your 
                    <span className="text-glow font-extrabold text-indigo-100"> coding skills.
                    </span>
                  </h1>
                
                  <h2 className="md:text-xl mt-8 text-slate-300 font-light">Select a difficulty and a language and start coding!</h2>
                </header>

                <HomeClient />
                         
              </section>
          </div>

          <hr className="w-[90%] md:w-[70%] border-[1px] rounded-full border-slate-800"></hr>
          <article className="w-full md:w-[80%] lg:w-[60%] mt-20">
            <h3 className="mb-2 text-slate-300 italic font-light">Fancy a challenge?</h3>
            <h2 className="text-3xl md:text-4xl font-semibold">Complete a <span className="text-glow font-extrabold">Daily challenge</span></h2>
            <h3 className="mt-5 font-light md:text-xl text-slate-300">
              Take on a fresh challenge daily that isn&apos;t in the main question pool.
            </h3>
            <p className="mt-3 text-slate-300 font-light">Questions are new for the day then get added to the question pool so you can always come back to it later.</p>
            <section className="mt-10 mb-10 flex flex-row justify-center items-center">
              <div className="border-2 border-slate-800 rounded-xl shadow-[0_0_20px_0] shadow-indigo-500/50 p-2 px-8 bg-[#13131d] font-semibold">Coming Soon</div>
            </section>
          </article>

        </section>
      <footer className="flex-shrink-0 mb-4 mt-4">
          <section className="flex flex-row justify-center items-center">
            <p className="text-slate-500">You can view the source on</p>
            <a href="https://github.com/Progalt/portfolio-react" target="_blank" className="ml-1 text-indigo-200 text-glow hover:text-white transition-all duration-150">Github</a>
          </section>
          <p className="mt-3 flex flex-row justify-center items-center text-slate-500 text-sm">Copyright © 2024, Henry Gronow</p>
        </footer>
      </div>
     
    </main>
  );
}
