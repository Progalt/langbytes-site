

import React, { useState } from 'react';

export function Modal({ children }) {

  return ( 
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 backdrop-blur-lg"></div>
        <div className="z-10 bg-white p-6 rounded-lg shadow-lg">
        {children}
        </div>
    </div>
  );
};