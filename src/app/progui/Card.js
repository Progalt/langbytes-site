import Container from "./Container";
import { cn } from "./utils";

export function CardHeader({ className, children }) {
    return (
        <header className={
            cn(
                "px-4 py-2 flex flex-col", 
                className
            )
        }>
            {children}
        </header>
    );
}

export function CardTitle({ className, children }) {
    return (
        <h1 className={
            cn(
                "font-semibold flex flex-row justify-start items-center",
                className
            )
        }>{children}</h1>
    );
}

export function CardDescription({ className, children }) {
    return (
        <h2 className={
            cn(
                "text-sm text-gray-500",
                className
            )}>
            {children}
        </h2>
    )
}

export default function Card({ className, children }) {
    return (
        <Container className={className}>
            {children}
        </Container>
    );
}   