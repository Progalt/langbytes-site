

import React, { useState } from 'react';

export function Modal({ children }) {

  return ( 
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
        <div className="z-10 bg-[#13131d] rounded-xl shadow-lg">
        {children}
        </div>
    </div>
  );
};