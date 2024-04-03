
import { useState } from "react";
import "../Styles.css";
import { motion } from "framer-motion"
import { HiMenu, HiOutlineX  } from "react-icons/hi";
import OutsideClick from "./OutsideClick";


const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
    transition: { type: "tween" }
  }

  const container = {
    hidden: { height: 50, width: 50 },
    show: {
      height: "auto",
      width: "auto",
      transition: {
        
        delayChildren: 0.15,
        staggerChildren: 0.15
      }
    }
  }
  
  

export function MobileDropDownButton({ onClick, title, highlight, hightlightColour = "bg-brand-500", outlineStyling }) {

    return (
        <motion.li
        variants={item}
        >
            <button
            onClick={onClick}
            className={`px-5 font-semibold text-left w-full h-12 my-[2px] rounded-lg ${outlineStyling} ${highlight ? hightlightColour : "bg-transparent"}`}>
                <h1>{title}</h1>
            </button>
        </motion.li>
    );
}

export function MobileDropDownDividor() {
    return (
        <motion.li 
        variants={item}
        className="mx-2 my-2 border-[1px] border-background-hover rounded-lg"/>
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

export function MobileDropDownNavWithButton({ children, borderStyling }) {

    const [ open, setOpen ] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    return (
        <OutsideClick onClickOutside={() => setOpen(false) }>
            <motion.ol
            initial={ "hidden" }
            animate={ open ? "show" : "hidden"}
            variants={container}
            className={`overflow-hidden m-5 shadow-lg shadow-black bg-background rounded-xl ${borderStyling}`}>
                <button disabled={isButtonDisabled} onClick={ async () => {  

                        setOpen(!open);

                        setIsButtonDisabled(true);
                        setTimeout(() => {
                            setIsButtonDisabled(false);
                          }, 250);
                        }} className="rounded-lg bg-transparent p-2">

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
        </OutsideClick>
    );
}