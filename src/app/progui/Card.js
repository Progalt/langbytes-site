
import { cn } from './utils'

export default function Card({ className, children }) {
    return (
        <div
        className={cn("rounded-lg border shadow bg-[#13131d]/30 border-[#232333] text-white backdrop-blur p-4", className)}>
            { children }
        </div>
    );
}

export function CardTitle({ className, children }) {
    return (
        <h3 className={cn("font-semibold leading-none tracking-tight mb-1", className)}>
            {children}
        </h3>
    );
}

export function CardDescription({ className, children }) {
    return (
        <p className={cn("text-sm text-slate-400", className)}>
            {children}
        </p>
    )
}