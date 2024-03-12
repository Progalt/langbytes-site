

"use client"

export function DifficultyButton({ difficulty, setDifficulty, selected }) {
    return (
        <div className={`mx-4 mb-5 bg-slate-800 p-[2px] rounded-full first-letter:transition-all duration-200 hover:shadow-[0_0px_15px_0] hover:shadow-indigo-700 ${selected === difficulty ? "scale-125 shadow-[0_0px_20px_0px] shadow-indigo-700" : "scale-100"}
        ${selected == difficulty ? "bg-gradient-to-r from-red-500 to-indigo-500" : "" }`}>
            <button 
            className={`bg-[#13131d]  py-1 w-32 rounded-full`}
            onClick={() => { setDifficulty(difficulty); }}>{difficulty}</button>
        </div>
    );
}