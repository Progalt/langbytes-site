import Container from "./Container";
import { cn } from "./utils";

export function SubscriptionPlanBox({ children }) {
    return (
        <section className="m-4 grid grid-cols-2  gap-4">
            {children}
        </section>
    );
}

export function SubscriptionPlanFeatureList({ children }) {
    return (
        <ul className="px-5 list-disc">
            {children}
        </ul>
    );
}

export function SubscriptionPlanFeature({ feature }) {
    return (
        <li className="py-1">
            {feature}
        </li>
    );
}

export default function SubscriptionPlan({ className, name, price = 0, baseCurrency = "£", paymentFreq = "", children }) {
    return (
        <Container className={
            cn("p-3 py-5",
            className)
        }>

            <h1 className="text-2xl font-semibold">{name}</h1>
            <div className="flex justify-start items-baseline px-4">
                <h2 className="flex items-start justify-start text-2xl font-semibold">
                {
                    price === 0 && 
                    "Free"
                }
                {
                    price !== 0 && 
                    <>
                        <span className="text-lg pr-1">{baseCurrency}</span>{price}
                    </>
                }

                </h2>
                <h3 className="pl-2 text-sm text-[#6b6b6b]">{paymentFreq}</h3>
            </div>

            <div className="my-2 h-[2px] w-full bg-background-hover"/>
            
            {children}

        </Container>
    );
}