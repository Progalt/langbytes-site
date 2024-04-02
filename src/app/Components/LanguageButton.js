

export function LanguageButton({ language, selectedLanguages, setSelectedLanguages }) {


    return (
        <button
            className={` bg-black/20 border-2 hover:bg-dark-brand-400 shadow-lg shadow-black font-semibold  py-2 w-32 rounded-xl text-sm transition-all duration-200 ${selectedLanguages.includes(language) ? "border-brand-500" : "border-dark-brand-400 " }`}
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