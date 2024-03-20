
export default function ErrorPage() {

    return (
        <main className="min-h-screen w-full">
            <article className="ml-[10%] pt-[10%] w-[50%]">
                <h1 className="text-4xl md:text-6xl font-bold">
                    <span className="text-glow text-indigo-100">Whoops! </span>
                    Something went wrong.
                </h1>
                <h2 className="pt-[30px] pb-2 text-slate-300">We aren't sure what but maybe going back to home might help.</h2>
                <a href="/" className="text-glow">Take me back!</a>
            </article>
        </main>
    )
}