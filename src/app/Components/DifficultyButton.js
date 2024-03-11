

"use client"

export function DifficultyButton({ difficulty, setDifficulty, selected }) {
    return (
        <div className="mx-4 mb-5">
            <button 
            className={`border-slate-800 border-2 py-1 w-32 rounded-full transition-all duration-200 hover:shadow-[0_0px_15px_0] hover:shadow-indigo-500 ${selected === difficulty ? "scale-125 shadow-[0_0px_15px_0px] shadow-indigo-500" : "scale-100"}`}
            onClick={() => { setDifficulty(difficulty); }}>{difficulty}</button>
        </div>
    );
}