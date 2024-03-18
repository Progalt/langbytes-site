import { useEffect, useRef } from "react";

// Small helper component that calls the onClickOutside callback when the user clicks outside
// the childrens render area
export default function OutsideClick({ onClickOutside, children }) {

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={ref}>
            {children}
        </div>
    )
}