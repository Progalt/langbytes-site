

export default function BevelledButton({ onClick, highlighted, children }) {
    return (
        <>
            { highlighted && 
                <button 
                onClick={() => {
                    onClick();
                
                }}
                className=" bg-gradient-to-br shadow-lg shadow-black from-indigo-200 to-indigo-200 via-indigo-800 text-white font-semibold rounded-xl p-[1px]">
                <span className="flex w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl p-2 px-4 transition-colors duration-200">
                {children}
                </span>
                </button>
            }
            { !highlighted && 
                <button 
                onClick={() => {
                    onClick();
                
                }}
                className=" bg-gradient-to-br shadow-lg shadow-black from-[#2d2d41] to-[#2d2d41] via-[#0b0b11] text-white font-semibold rounded-xl p-[1px]">
                <span className="flex w-full bg-[#13131d] hover:bg-[#232333] text-white rounded-xl p-2 px-4 transition-colors duration-200">
                {children}
                </span>
                </button>
            }
        </>
      );
}

export function BasicButton({ onClick, highlighted, children }) {
    return (
        <>
            { highlighted && 
                <button 
                onClick={() => {
                    onClick();
                
                }}
                className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-indigo-500 hover:bg-indigo-500/80 border-indigo-300 focus-visible:outline-indigo-600 shadow-sm data-[state=open]:bg-indigo-500/80 data-[state=open]:outline-indigo-600 text-sm px-4 py-2 h-[38px] text-white">
                <span className="truncate">
                {children}
                </span>
                </button>
            }
            { !highlighted && 
                <button 
                onClick={() => {
                    onClick();
                
                }}
                className=" bg-gradient-to-br shadow-lg shadow-black from-[#2d2d41] to-[#2d2d41] via-[#0b0b11] text-white font-semibold rounded-xl p-[1px]">
                <span className="flex w-full bg-[#13131d] hover:bg-[#232333] text-white rounded-xl p-2 px-4 transition-colors duration-200">
                {children}
                </span>
                </button>
            }
        </>
      );
}