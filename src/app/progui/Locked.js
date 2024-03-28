
import { FaLock } from "react-icons/fa";

// This component creates a locked effect around the children elements

export default function Locked({ text, showPadlock, children }) {
    return (
        <div className="relative">
            <div className="blur-lg">{children}</div>
            <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
                <div className="z-30 flex flex-col justify-center items-center">
                    {  showPadlock && <FaLock className="text-3xl"/> }
                    <span className="text-xl text-slate-300">{text}</span>
                </div>
            </div>
        </div>
    );
}