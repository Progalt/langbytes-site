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

        </section>
      <footer className="flex-shrink-0 mb-4">
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
