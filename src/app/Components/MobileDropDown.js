
import { useState } from "react";
import "../Styles.css";
import { motion } from "framer-motion"
import { HiMenu, HiOutlineX  } from "react-icons/hi";


const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
    transition: { type: "tween" }
  }

  const container = {
    hidden: { height: "auto", width: 50 },
    show: {
      height: "auto",
      width: "auto",
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.15
      }
    }
  }
  
  

export function MobileDropDownButton({ onClick, title, highlight }) {

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

export function MobileDropDownNavWithButton({ children }) {

    const [ open, setOpen ] = useState(false);

    const menuButtonStyle = {
        
      };

    return (
        <motion.ol
        animate={ open ? "show" : "hidden"}
        variants={container}
        className={`overflow-hidden m-5 bg-[#13131d] border-2 rounded-xl border-indigo-500`}>
            <button onClick={ async () => {                
                       setOpen(!open);
                    }} className="rounded-lg bg-[#13131d] p-2">

                        { !open && <HiMenu className="text-3xl"/> }
                        { open && <HiOutlineX  className="text-3xl"/> }

            </button>
           
            {
                <motion.div
                    animate={{ height: open ? "auto" : 0}}
                    className={`px-2 ${open ? "py-1 pb-2" : ""}`}>
                    {children}
                </motion.div>
            }
           
        </motion.ol>
    );
}