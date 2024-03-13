import { useState } from "react";



export function Tooltip({ text, children  }) { 
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative">
            <div
                className="inline-block"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {children}
            </div>
            {showTooltip && (
                <div className="absolute x-20 bg-black/50 text-white text-sm py-1 px-2 rounded whitespace-nowrap top-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                {text}
                </div>
            )}
        </div>
    ); 
}