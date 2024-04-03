import SubscriptionPlan, { SubscriptionPlanBox, SubscriptionPlanFeature, SubscriptionPlanFeatureList } from "../progui/SubscriptionPlan";


export default function Plan() {
    return (
        <main className="w-full min-h-screen flex flex-col relative">
            <div className="absolute -z-50 h-full w-full dark:bg-black bg-white bg-grid-white/[0.15]">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(circle_at_50%_30%,transparent_5%,black_50%)]"></div>
            </div>

            <section className="mx-56">
                <SubscriptionPlanBox>
                    <SubscriptionPlan
                        name="Starter"
                        price={0}>
                            <SubscriptionPlanFeatureList>
                                <SubscriptionPlanFeature feature="Access to a vast library of questions!" />
                                <SubscriptionPlanFeature feature="Daily Challenges!" />
                                <SubscriptionPlanFeature feature="Favourite Questions!" />
                            </SubscriptionPlanFeatureList>
                    </SubscriptionPlan>
                    <SubscriptionPlan
                        name="Premium"
                        price={2.99}
                        paymentFreq="Once"
                        >
                            <SubscriptionPlanFeatureList>
                                <SubscriptionPlanFeature feature="Access to the full library of questions!" />
                                <SubscriptionPlanFeature feature="Ability to make curated lists of questions of your choice." />
                                <SubscriptionPlanFeature feature="Access to new features before they release to everyone else!" />
                            </SubscriptionPlanFeatureList>
                    </SubscriptionPlan>
                </SubscriptionPlanBox>
            </section>

        </main>
    );
}