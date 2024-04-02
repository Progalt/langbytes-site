import { cn } from "./utils";


export default function Container({className, children }) {


    let styles = cn(
        "relative border-2 border-dark-brand-300 bg-background rounded-xl shadow",
        className
    );

    return (
        <div className={styles}>
            {children}
        </div>
    );
}