import { useRouter } from "next/navigation";


export default function NavButton({ name, location }) {

    const router = useRouter();

    return (
        <button className="text-indigo-500 font-semibold w-34 bg-transparent hover:text-indigo-200 transition-colors duration-150 ease-linear"
        onClick={() => {
            router.push(location);
        }}>
            {name}
        </button>
    );

}