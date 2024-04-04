import { cn } from "./utils";


export default function Skeleton({ className }) {
    return (
        <div className={cn(
            "animate-pulse bg-background-hover rounded-full",
            className
        )}>

        </div>
    );
}