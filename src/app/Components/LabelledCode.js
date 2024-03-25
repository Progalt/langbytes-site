import { FaRegCopy } from "react-icons/fa6";
import { Tooltip } from "./Tooltip";


export default function LabelledCode({ label, copyButton, children }) {
    
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
            <div className="flex flex-row w-full justify-between items-center mr-5 mb-2 bg-[#232333] px-4 py-2 rounded-lg">
                <code className="">{children}</code>
                <Tooltip text="Copy inputs">
                    <button className="flex-shrink-0 text-xl  text-white hover:text-indigo-500 transition-all duration-100" onClick={copyToClipboard}>
                        <FaRegCopy/>
                    </button>
                </Tooltip>
            </div> }
            { !copyButton && 
                <div className="min-h-[40px] bg-[#232333] px-4 py-2 rounded-lg mb-2">
                    <code className="">{children}</code>
                </div>
            }
        </>
    );
}