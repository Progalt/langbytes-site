"use client";
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';


function LanguageButton({ name, setSelectedLanguage, selectedLang }) {
    return (
        <button onClick={() => { setSelectedLanguage(name) }}
        className={`mx-[0.15em] text-sm px-2 rounded-lg border-2 border-slate-800`}
        style={{
            backgroundColor: name == selectedLang ? '#292a37' : '#17181f'
        }}>
            {name}
        </button>
    )
}

export function TaskSnippet() {


    const [isRevealed, setIsRevealed] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("Python");

    const codeSnippets = {
        'Python': `
def squareList(list):
    return [x**2 for x in list]
        `,
        'JavaScript': `
function squareList(list) {
    return list.map(x => x ** 2);
}
        `,
        'Haskell': `
squareList :: [Int] -> [Int]
squareList list = map (^2) list
        `
      };

    const revealAnswer = () => {
        setIsRevealed(true);
      };

    return (
        <section className={`shadow-[0_0px_60px_0px] shadow-indigo-500/20 border-2 border-slate-800 w-full rounded-lg p-4 overflow-hidden`}
        style={{
          }}>
            <p className="font-light text-xl mb-3">
                Write a function that returns the square of each element in an array.
            </p>
            <hr className="border border-slate-800 mb-2"></hr>
            <p className="font-light text-lg">Input: </p>
            <code>{"[2, 4, 8]"}</code>
            <p className="font-light text-lg">Output: </p>
            <code>{"[4, 16, 64]"}</code>
            <br />
            { !isRevealed && <button onClick={revealAnswer} >Reveal Answer</button> } 
            { isRevealed && <div className="mt-4 ">
                <div className="flex flex-row">
                    {Object.keys(codeSnippets).map((lang, index) => (
                        <LanguageButton
                        key={index}
                        name={lang}
                        selectedLang={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        />
                    ))}
                </div>
                <SyntaxHighlighter language={selectedLanguage.toLowerCase()} style={dracula}>
                    {codeSnippets[selectedLanguage].trim()}
                </SyntaxHighlighter>

               

            </div> } 
            
        </section>
    );
}