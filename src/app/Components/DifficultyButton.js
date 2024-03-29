

"use client"

export function DifficultyButton({ difficulty, setDifficulty, selected }) {
    return (
        <div className={`w-full md:w-auto mx-4 mb-2 md:mb-5 bg-slate-800 p-[2px] rounded-lg first-letter:transition-all duration-200 hover:shadow-[0_0px_15px_0] hover:shadow-indigo-700 ${selected === difficulty ? "scale-100 md:scale-110 shadow-[0_0px_20px_0px] shadow-indigo-700" : "scale-90 md:scale-100"}
        ${selected == difficulty ? "bg-gradient-to-r from-red-500 to-indigo-500" : "" }`}>
            <button 
            className={`bg-[#13131d]  py-1 w-full md:w-36 rounded-lg`}
            onClick={() => { setDifficulty(difficulty); }}>{difficulty}</button>
        </div>
    );
}