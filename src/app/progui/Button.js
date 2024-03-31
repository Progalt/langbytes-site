import Link from "next/link";
import { cn } from "./utils";


export default function Button({ onClick, children, href, className }) {

    let styling = cn(
        "relative isolate border-2 inline-flex items-center justify-center",
        "rounded-md h-9 py-2 px-4 transition-color duration-200 whitespace-nowrap",
        "font-medium md:text-sm text-white shadow-sm",
        "bg-dark-brand-500 border-dark-brand-400 hover:bg-dark-brand-400",
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