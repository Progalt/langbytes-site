import { useEffect, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";
import "../Styles.css";
import { FaAngleRight } from "react-icons/fa6";
import OutsideClick from "./OutsideClick";

export default function DropDown({ options, onSelect, defaultOption = "", closeOnSelect }) {

    const [ currentSelected, setSelected ] = useState(defaultOption);
    const [ isOpen, setOpen ] = useState(false);
    
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
            className="mx-2 relative bg-[#0a0a0f]">
                <button 
                onClick={() => {
                    
                    setOpen(!isOpen);
                }}
                className={`h-14 w-full flex flex-col justify-center px-4 border-2 rounded-t-lg transition-all duration-400 border-slate-800 ${!isOpen ? "rounded-lg" : ""}`}>
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
                        className={`border-b-2 border-x-2 px-10 py-2 border-slate-800 hover:bg-[#1b1b29] transition-all duration-150 ${isLast ? "rounded-b-lg" : ""}`}>
                            {value}
                        </div>
                        );
                    })}
                </button>
                
                
            </section>
        </OutsideClick>
    );
}