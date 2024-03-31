import Link from "next/link";
import { cn } from "./utils";


export default function Button({ onClick, children, href, className }) {

    let styling = cn(
        "relative isolate w-28 border-2 inline-flex items-center justify-center rounded-lg gap-x-2    p-2 px-6 transition-color duration-200",
        "font-semibold text-white",
        "bg-dark-brand-500 border-dark-brand-400 hover:bg-dark-brand-400 hover:border-dark-brand-300",
        className
        );

    if (href) {
        return (
            <Link href={href} className={styling}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={styling}>

                {children}
            
        </button>
    );
}