import Link from "next/link";
import { cn } from "./utils";


export default function Button({ onClick, children, href, className }) {

    let styling = cn(
        "relative isolate border-2 inline-flex items-center justify-center",
        "rounded-lg h-9 py-2 px-4 transition-color duration-100 whitespace-nowrap",
        "font-medium md:text-sm text-white shadow-sm",
        "border-background-hover hover:bg-background-hover bg-background",
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