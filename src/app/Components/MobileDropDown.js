
import "../Styles.css";
import { motion } from "framer-motion"


const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
    transition: { type: "tween" }
  }

  const container = {
    hidden: { height: 0 },
    show: {
      height: "auto",
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.15
      }
    }
  }
  
  

export function MobileDropDownButton({ onClick, title, highlight, visible }) {

    return (
        <motion.li
        variants={item}
        >
            <button
            onClick={onClick}
            className={`px-5 font-semibold text-left w-full h-12 my-[2px] rounded-lg ${highlight ? "bg-indigo-500 border-indigo-800" : "bg-[#0a0a0f] border-slate-800"}`}>
                <h1>{title}</h1>
            </button>
        </motion.li>
    );
}

export function MobileDropDownDividor() {
    return (
        <motion.li 
        variants={item}
        className="mx-2 my-1 border-[1px] border-slate-800 rounded-lg"/>
    )
}

export default function MobileDropDownNav({ children, visible }) {
    return (
        <motion.ol
        variants={container}
        animate={ visible ? "show" : "hidden"}
        className={`overflow-hidden`}>
            <div className=" mx-2 p-1 border-2 border-slate-800 bg-[#0a0a0f] rounded-xl">
                {children}
            </div>
        </motion.ol>
    );
}