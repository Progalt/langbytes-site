

export function LanguageButton({ language, selectedLanguages, setSelectedLanguages }) {


    return (
        <button
            className={`bg-[#13131d] border-2 hover:bg-[#232333] shadow-lg shadow-black font-semibold  py-2 w-32 rounded-xl text-sm transition-all duration-200 ${selectedLanguages.includes(language) ? "border-brand-500" : "border-[#232333] hover:border-[#2b2b3d]" }`}
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