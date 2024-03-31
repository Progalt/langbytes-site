import { cn } from "./utils";


// This creates a nice badge component.  It has some default colours that can be specified with colour
// but you can override and use className to define the colours yourself
export default function Badge({ name, colour, className }) {
    let c = "";
    if (colour !== null || colour !== undefined) {
        c = colour; 
    }

    return (
        <div 
        className={cn(
            "inline-block rounded-full py-1 px-4 text-sm",
            c === "red" ? ("text-red-500 bg-red-500/30 border-red-500") : "",
            c === "blue" || c === "" ? ("text-blue-500 bg-blue-500/30 border-blue-500") : "",
            c === "green" ? ("text-green-500 bg-green-500/30 border-green-500") : "",
            className
        )}>
            {name}
        </div>
    );

}