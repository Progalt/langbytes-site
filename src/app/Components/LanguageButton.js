

export function LanguageButton({ language, selectedLanguages, setSelectedLanguages }) {


    return (
        // <div className={`w-32 bg-slate-800 p-[2px] rounded-xl first-letter:transition-all duration-200 hover:shadow-[0_0px_15px_0] hover:shadow-indigo-700 ${selectedLanguages.includes(language) ? "scale-110 shadow-[0_0px_20px_0px] shadow-indigo-700" : "scale-100"}
        // ${selectedLanguages.includes(language) ? "bg-gradient-to-r from-red-500 to-indigo-500" : "" }`}>
        //     <button 
        //     className={`bg-[#13131d]  py-1 w-full rounded-xl text-sm`}
        //     onClick={() => { 
        //         if (selectedLanguages.includes(language)) {
        //             selectedLanguages = selectedLanguages.filter(item => item !== language);
        //             setSelectedLanguages(selectedLanguages);
        //         }
        //         else {
        //             let arr = [language];
        //              setSelectedLanguages(arr);
        //         }
        //      }}>{language}</button>
        // </div>
        <button
            className={`bg-[#13131d] font-semibold  py-2 w-32 rounded-xl text-sm border-2 hover:shadow-[0_0_20px_0] hover:shadow-indigo-500/50 transition-all duration-200 ${selectedLanguages.includes(language) ? "border-indigo-500" : "border-slate-800" }`}
            onClick={() => { 
                if (selectedLanguages.includes(language)) {
                    selectedLanguages = selectedLanguages.filter(item => item !== language);
                    setSelectedLanguages(selectedLanguages);
                }
                else {
                    let arr = [language];
                     setSelectedLanguages(arr);
                }
             }}>
            {language}
        </button>
    );
}