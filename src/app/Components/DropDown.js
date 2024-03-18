import { useEffect, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";
import "../Styles.css";
import { FaAngleRight } from "react-icons/fa6";

export default function DropDown({ options, onSelect, defaultOption = "", closeOnSelect }) {

    const [ currentSelected, setSelected ] = useState(defaultOption);
    const [ isOpen, setOpen ] = useState(false);

    
    const onClickHandler = (value) =>  {
        setSelected(value);
        onSelect(value);

        if (closeOnSelect) {
            setOpen(false);
        }
    };

    return (
        <section 
        className="mx-2 relative">
            <div 
            onClick={() => {
                setOpen(!isOpen);
            }}
            className={`h-14 flex flex-col justify-center px-4 border-2 rounded-t-lg transition-all duration-400 border-slate-800 ${!isOpen ? "rounded-lg" : ""}`}>
                <div className="flex flex-row items-center gap-2">
                    <FaAngleRight className={`transition-all duration-150 ${isOpen ? "rotate-90" : ""}`}/>
                    {currentSelected}
                </div>
            </div>

                <div className={`dropdown-menu absolute left-0 w-full z-10 bg-[#13131d] ${isOpen ? "slide-down" : "slide-up" }`}>
                    {options.map((value, index) => {
                        let isLast = index === options.length - 1;
                        return ( 
                        <div key={value} onClick={() => {onClickHandler(value);}}
                        className={`border-b-2 border-x-2 px-10 py-2 border-slate-800 ${isLast ? "rounded-b-lg" : ""}`}>
                            {value}
                        </div>
                        );
                    })}
                </div>
            
            
        </section>
    );
}