"use client";
import { Tooltip } from "./Tooltip";
import { cn } from "../progui/utils";
import { HiDocumentDuplicate, HiOutlineDocumentDuplicate } from "react-icons/hi";
import { useState } from "react";


export default function LabelledCode({ label, copyButton, className, children }) {
    
    const [hoveredCopy, setHover ] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(children)
        .then(() => {
            console.log("Copied inputs to clipboard: ", children);
        })
        .catch((err) => {
            console.log("Failed to copy inputs to clipboard: ", err);
        });
    };
    
    return (
        <>
            <p className="font-light text-lg mb-1">{label}</p>
            { copyButton && 
            <div className={cn("flex flex-row w-full justify-between items-center mr-5 mb-2 bg-background-hover px-4 py-2 rounded-lg", className)}>
                <code className="">{children}</code>
                
                <button 
                onMouseOver={() => { setHover(true); }}
                onMouseOut={() => { setHover(false); }}
                className="flex-shrink-0 text-2xl  text-white transition-all duration-100" onClick={copyToClipboard}>
                    { !hoveredCopy && <HiOutlineDocumentDuplicate/> } 
                    { hoveredCopy && <HiDocumentDuplicate/> } 
                </button>
         
            </div> }
            { !copyButton && 
                <div className={cn("min-h-[40px] bg-background-hover px-4 py-2 rounded-lg mb-2", className)}>
                    <code className="">{children}</code>
                </div>
            }
        </>
    );
}