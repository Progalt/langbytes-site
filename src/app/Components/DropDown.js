import { useEffect, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";
import "../Styles.css";
import { FaAngleRight } from "react-icons/fa6";
import OutsideClick from "./OutsideClick";
import { motion } from "framer-motion"

export default function DropDown({ options, onSelect, defaultOption = "", closeOnSelect }) {

    const [ currentSelected, setSelected ] = useState(defaultOption);
    const [ isOpen, setOpen ] = useState(false);
    const [ isButtonDisabled, setIsButtonDisabled] = useState(false);
    
    const onClickHandler = (value) =>  {

        if (!isOpen) {
           
            setOpen(true);
            return; 
        }
        setSelected(value);
        onSelect(value);

        if (closeOnSelect) {
            setOpen(false);
        }
    };


    return (
        <OutsideClick onClickOutside={() => { setOpen(false); }}>
            <section 
            className="mx-2 relative bg-background rounded-lg">
                <button disabled={isButtonDisabled}
                onClick={() => {
                    
                    setOpen(!isOpen);
                    setIsButtonDisabled(true);
                    setTimeout(() => {
                        setIsButtonDisabled(false);
                    }, 250);
                }}
                className={`h-14 w-full flex flex-col shadow-lg shadow-black justify-center px-4 border-2 rounded-t-lg transition-all duration-400 border-[#232333] ${!isOpen ? "rounded-lg" : ""}`}>
                    <div className="flex flex-row items-center gap-2">
                        <FaAngleRight className={`transition-all duration-150 ${isOpen ? "rotate-90" : ""}`}/>
                        {currentSelected}
                    </div>
                </button>

                <button className={`dropdown-menu text-left absolute left-0 w-full z-10 bg-[#13131d] ${isOpen ? "slide-down" : "slide-up" }`}>
                    {options.map((value, index) => {
                        let isLast = index === options.length - 1;
                        return ( 
                        <div key={value} onClick={() => {onClickHandler(value);}}
                        className={`border-b-2 border-x-2 px-10 py-2 border-[#232333] hover:bg-[#1b1b29] transition-all duration-150 ${isLast ? "rounded-b-lg" : ""}`}>
                            {value}
                        </div>
                        );
                    })}
                </button>
                
                
            </section>
        </OutsideClick>
    );
}

const item = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 },
    transition: { type: "tween" }
  }

  const container = {
    hidden: { height: "auto", width: "full"  },
    show: {
      height: "auto",
      width: "full",
      transition: {
        
        delayChildren: 0.15,
        staggerChildren: 0.15
      }
    }
  }
  

export function DropDownAnimated({ options, onSelect, defaultOption = "", closeOnSelect }) {
    
    const [ currentSelected, setSelected ] = useState(defaultOption);
    const [ open, setOpen ] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const onClickHandler = (value) =>  {
        if (!open) {
           
            setOpen(true);
            return; 
        }
        setSelected(value);
        onSelect(value);

        if (closeOnSelect) {
            setOpen(false);
        }
    };

    return (
        <OutsideClick onClickOutside={() => setOpen(false) }>
            <motion.ol
            initial={ "hidden" }
            animate={ open ? "show" : "hidden"}
            variants={container}
            className={`font-semibold overflow-hidden m-5 shadow-lg shadow-black bg-background rounded-xl border-2 border-dark-brand-400`}>
                <button onClick={ () => {  

                        setOpen(!open);
                        console.log("open");
                        }} className="w-full rounded-lg bg-background p-3">

                        <div className="flex flex-row items-center gap-2">
                            <FaAngleRight className={`transition-all duration-150 ${open ? "rotate-90" : ""}`}/>
                            {currentSelected}
                        </div>

                </button>
            
                {
                    <motion.div
                        animate={{ height: open ? "auto" : 0}}
                        className={` flex flex-wrap`}>
                        <button className="w-full flex flex-col justify-start items-start">
                        {options.map((value, index) => {
                     
                        return ( 
                        <motion.div 
                        variants={item}
                        key={value} onClick={() => {onClickHandler(value);}}
                        className={`w-full px-10 py-2 text-left hover:bg-dark-brand-400`}>
                            {value}
                        </motion.div>
                        );
                        })}
                        </button>

                    </motion.div>
                }
            
            </motion.ol>
        </OutsideClick>
    );
}