

import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

export function Modal({ children, setOpen }) {

  return ( 
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
        <div className="w-96 z-10 pb-5 bg-[#13131d] rounded-xl shadow-lg px-4 py-2 border-2 border-slate-800">
          <div className="flex flex-row justify-end mb-2">
            <button onClick={() => { setOpen(false) }}>
              <IoClose className="text-3xl md:text-2xl"/>
            </button>
          </div>
          {children}
        </div>
    </div>
  );
};