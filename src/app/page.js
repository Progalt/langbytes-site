import "./Styles.css";
import UserNav from "./Components/UserNav";
import HomeClient from "./homeClient";
import Locked from "./progui/Locked";
import { BiShare } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import Badge from "./progui/Badge";
import Container from "./progui/Container";
import Card, { CardDescription, CardHeader, CardTitle } from "./progui/Card";
import CodeSnippet from "./progui/CodeSnippet";


export default async function Home() {

  return (
    <main className="bg-gradient-base w-full min-h-screen flex flex-col relative">
      {/* <div className="background-svg opacity-40 md:opacity-50 bg-[length:200%] md:bg-[length:100%] lg:bg-[length:80%] xl:bg-[length:50%]" /> */}
      <nav className="hidden md:block absolute w-full top-0 z-50">
        <UserNav/>
      </nav>
      <nav className=" md:hidden absolute w-full">
        <UserNav />
      </nav>

    
      <div className="flex flex-col flex-grow justify-between transition-transform duration-150">
        <section className=" pt-12 w-full flex flex-col justify-start items-center">
          
          <section className=" px-5 w-full md:w-[80%] lg:w-[70%] 2xl:w-[40%]">
            <section className="h-[calc(100vh_-_124px)] min-h-[650px]  flex flex-col justify-center items-start">
              <header className=" md:mb-14 overflow-visible">
                {/* <Badge name="Handcrafted Questions" colour="blue" className="bg-brand-500/20 text-brand-500 mb-2"/> */}
                <Badge name="All handcrafted questions!" colour="blue" className="bg-brand-500/20 text-brand-500 mb-2"/>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold">
                  Quickly get <br />problems to test <br />your
                  <span className={"font-extrabold text-brand-500 bg-gradient-to-r from-[#5DFDCB] to-brand-500 text-transparent bg-clip-text"}> coding skills.
                  </span>
                </h1>
              
                
                <h2 className="md:text-xl text-lg mt-10 text-slate-300">
                  Select a difficulty and a language and start coding! 
                </h2>
              </header>

              <HomeClient />
                      
            </section>

            
            <section id="challenge" className="mt-20">
              <Badge name="Fancy a challenge?" colour="green" className="bg-[#FF705B]/20 text-[#FF705B] border-[#FF705B] mb-2" />
              <h2 className="text-3xl md:text-5xl font-semibold">Complete a <br /><span className="font-extrabold  bg-gradient-to-r from-[#FFB457] to-[#FF705B] text-transparent bg-clip-text">Daily challenge.</span></h2>
              <h2 className="md:text-xl text-lg mt-6 text-slate-300">
                  A new challenge everyday to keep your skills sharp!
              </h2>
              <CodeSnippet language="cpp">
                {`#include <iostream>

int main(int argc, char* argv[]) {
  std::cout << "Hello World" << std::endl;
  return 0;
}`}
              </CodeSnippet>
            </section>
            
           
            
            
          </section>
          

        </section>
      <footer className="flex-shrink-0 mb-6 mt-6">
          <section className="flex flex-row justify-center items-center">
            <p className="text-slate-300">You can view the source on</p>
            <a href="https://github.com/Progalt/portfolio-react" target="_blank" className="ml-1 text-[#FF705B] hover:text-white transition-all duration-150">Github</a>
          </section>
          <p className="mt-3 flex flex-row justify-center items-center text-slate-300 text-sm">Copyright © 2024, Henry Gronow</p>
        </footer>
      </div>

     
    </main>
  );
}  