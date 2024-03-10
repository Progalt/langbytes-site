
"use client";

import { VscEye, VscEyeClosed  } from "react-icons/vsc";
import { FaApple  } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import React, { useRef, useState } from "react";

export function PasswordInputBox({handleChange, visibiltyToggle }) {

    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef(null);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    var visToggle = <></>;

    const changeOverride = (event) => {
        handleChange(event);
    };

    if (visibiltyToggle === true) {
        visToggle =
        <button type="button" onClick={handleTogglePassword}
        className="bg-transparent rounded-r-lg text-black text-3xl pr-2 absolute ml-[-1.275em] mt-[0.17em]">
            {!showPassword ? <VscEye /> : <VscEyeClosed />}
        </button>
    }

    return (
        <>
            <label htmlFor="userPassword">Password</label>
            <div className="mt-1 mb-5">
                <input id="userPassword" name="password" ref={passwordRef} type={showPassword ? 'text' : 'password'} minLength="8" placeholder="Password" onChange={changeOverride} onFocus={changeOverride} required 
                className={`w-full rounded-lg h-10 outline-2 text-black p-2 pr-12 border-transparent focus:ring-transparent focus:border-transparent focus:outline focus:outline-blue-500 focus:outline-offset-2`} />
                {visToggle}
            </div>
        </>
    );
}

export function PhoneNumberInputBox({ handleChange }) {
    return (
        <>
            <label htmlFor="userPhone">Phone Number</label>
            <div className="mt-1 mb-5">
                <input id="userPhone" name="phoneNumber" type="tel" placeholder="Phone Number" onChange={handleChange}
                className="w-full rounded-lg h-10 outline-2 text-black p-2 border-transparent focus:ring-transparent focus:border-transparent focus:outline focus:outline-blue-500 focus:outline-offset-2" />
            </div>
        </>
    )
}

export function InputBox({ handleChange, type, name, placeholder, label }) {

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <div className="mt-1 mb-4">
                <input id={name} type={type} name={name} placeholder={placeholder} onChange={handleChange} required
                className="w-full rounded-lg h-10 outline-2 text-black p-2 border-transparent focus:ring-transparent focus:border-transparent focus:outline focus:outline-blue-500 focus:outline-offset-2" />
            </div>
        </>
    );
}

export function OAuthButton({ onClick, children }) {
    return (
        <button onClick={onClick} className="text-3xl min-w-20 w-full h-full border-2 border-gray-300  bg-transparent hover:bg-gray-800 flex items-center justify-center rounded-lg">
            { children }
        </button>
    );
}

export function OAuthGoogle({ onClick }) {
    return (
        <OAuthButton onClick={onClick}>
            <FcGoogle />
        </OAuthButton>
    );
}

export function OAuthApple({ onClick }) {
    return (
        <OAuthButton onClick={onClick}>
            <FaApple className="text-white"/>
        </OAuthButton>
    );
}

export function OAuthHorizontalBar({ children }) {
    return (
        <div className="h-12 flex flex-row gap-2">
            {children}
        </ div>
    );
}

export function AccountForm({ name, children, onSubmit, errorText }) {

    const [formData, setFormData] = useState();

    const handleSubmit = (event) => {
        event.preventDefault()

        const { email, password, staySignedIn } = formData;

        onSubmit({ email, password, staySignedIn });
    };

    let errBox = <></>;
    
    if (errorText.length > 0) {
        errBox = (
            <div className="bg-transparent border-2 p-1 px-2 rounded-lg border-red-500 mb-3">
                <p className="text-red-500">{errorText}</p>
            </div>
        );
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
    // TODO: Fix this so it doesn't add it to every child because some won't need it
    const childrenWithCallback = React.Children.map(children, child =>
        React.cloneElement(child, { handleChange })
      );

    return (
        <form onSubmit={handleSubmit}>
            {childrenWithCallback}
            {errBox}
            <input type="submit" value={name} 
            className="w-full bg-blue-500 outline-2 h-10 rounded-lg hover:bg-blue-400 hover:outline hover:outline-blue-500 hover:outline-offset-2" />
        
        </form>
    );
}

// This  creates a sign in component for an email and password sign in
export default function SignInEmailPassword({ onSubmit, onForgotPassword, errorText }) {

    return (
        <>
            <AccountForm name="Sign In" onSubmit={onSubmit} errorText={errorText}>
                <InputBox type="email" name="email" placeholder="Email" label="Email Address"/>
                <PasswordInputBox visibiltyToggle={true}/>
                <div className="mb-3 flex justify-end mx-2">
                    <button type="button" onClick={onForgotPassword} className="text-blue-500 hover:text-blue-400">Forgot Password?</button>
                </div>
            </AccountForm>
            {/* <div className="mt-4 flex items-center justify-center">
                <div className="w-full h-[1px] bg-slate-300"></div>
                <p className="mx-4 whitespace-nowrap">or</p>
                <div className="w-full h-[1px] bg-slate-300"></div>
            </div>
            
            <div className="mt-4">
                <OAuthHorizontalBar>
                    <OAuthGoogle/>
                    <OAuthApple/>

                </OAuthHorizontalBar>
            </div> */}
        </>
    );
}



export function RegistrationEmailPassword({ onSubmit, errorText }) {
    return (
        <AccountForm name="Register" onSubmit={onSubmit} errorText={errorText}>
            <InputBox type="text" name="displayName" placeholder="Display Name" label="Display Name"/>
            <PhoneNumberInputBox></PhoneNumberInputBox>
            <InputBox type="email" name="email" placeholder="Email" label="Email Address"/>
            <PasswordInputBox visibiltyToggle={true}/>
        </AccountForm>
    );
}