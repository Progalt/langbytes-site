
"use client";

import { VscEye, VscEyeClosed  } from "react-icons/vsc";
import { FaApple  } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaRegCheckCircle } from "react-icons/fa";

import React, { useRef, useState } from "react";
import AnimateHeight from "react-animate-height";

export function PasswordInputBox({onChange, formChange, visibiltyToggle, onFocus }) {

    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef(null);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    var visToggle = <></>;


    const handleFocus = () => {
       
        onFocus(true);
    };

    const handleBlur = () => {
        onFocus(false);
    };

    const handleChange = (event) => {
        formChange(event);
        onChange(event.target.value);
    }

    if (visibiltyToggle === true) {
        visToggle =
        <button type="button" onClick={handleTogglePassword}
        className="bg-transparent rounded-r-lg text-black text-3xl pr-2 absolute ml-[-1.275em] mt-[0.17em]">
            {!showPassword ? <VscEye /> : <VscEyeClosed />}
        </button>
    }

    return (
        <>
            <label htmlFor="password">Password</label>
            <div className="mt-1 mb-5">
                <input id="password" name="password" ref={passwordRef} type={showPassword ? 'text' : 'password'} minLength="8" placeholder="Password" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}  required 
                className={`w-full rounded-lg h-10 outline-2 text-black p-2 pr-12 border-transparent focus:ring-transparent focus:border-transparent focus:outline focus:outline-indigo-500 focus:outline-offset-2 focus:shadow-[0_0px_30px_0] focus:shadow-indigo-500`} />
                {visToggle}
            </div>
        </>
    );
}

export function ConfirmPasswordInputBox({onChange, formChange, visibiltyToggle, onFocus }) {

    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef(null);
    const [ passwordsMatch, setPasswordsMatch ] = useState(true);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    var visToggle = <></>;


    const handleFocus = () => {
       
        onFocus(true);
    };

    const handleBlur = () => {
        onFocus(false);
    };

    const handleChange = (event) => {
        formChange(event);
        setPasswordsMatch(onChange(event.target.value));
    }

    if (visibiltyToggle === true) {
        visToggle =
        <button type="button" onClick={handleTogglePassword}
        className="bg-transparent rounded-r-lg text-black text-3xl pr-2 absolute ml-[-1.275em] mt-[0.17em]">
            {!showPassword ? <VscEye /> : <VscEyeClosed />}
        </button>
    }

    return (
        <>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="mt-1 mb-5">
                <input id="confirmPassword" name="confirmPassword" ref={passwordRef} type={showPassword ? 'text' : 'password'} minLength="8" placeholder="Password" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}  required 
                className={`w-full rounded-lg h-10 outline-2 text-black p-2 pr-12 border-transparent focus:ring-transparent focus:border-transparent focus:outline focus:outline-indigo-500 focus:outline-offset-2 focus:shadow-[0_0px_30px_0] focus:shadow-indigo-500`} />
                {visToggle}
            </div>
            {
                !passwordsMatch && 
                <h2 className="text-red-500 -mt-2 mb-4">Passwords must match</h2>
            }
        </>
    );
}

export function PhoneNumberInputBox({ formChange }) {
    return (
        <>
            <label htmlFor="userPhone">Phone Number</label>
            <div className="mt-1 mb-5">
                <input id="userPhone" name="phoneNumber" type="tel" placeholder="Phone Number" onChange={formChange}
                className="w-full rounded-lg h-10 outline-2 text-black p-2 border-transparent focus:ring-transparent focus:border-transparent focus:outline focus:outline-indigo-500 focus:outline-offset-2" />
            </div>
        </>
    )
}

export function InputBox({ formChange, type, name, placeholder, label }) {

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <div className="mt-1 mb-4">
                <input id={name} type={type} name={name} placeholder={placeholder} onChange={formChange} required
                className="w-full rounded-lg h-10 outline-2 text-black p-2 border-transparent focus:ring-transparent focus:border-transparent focus:outline focus:outline-indigo-500 focus:outline-offset-2 focus:shadow-[0_0px_30px_0] focus:shadow-indigo-500" />
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

        console.log(formData);
        const { email, password } = formData;

        onSubmit({ email, password });
    };

    let errBox = <></>;
    
    if (errorText.length > 0) {
        errBox = (
            <div className="bg-transparent border-2 p-1 px-2 rounded-lg border-red-500 mb-3">
                <p className="text-red-500">{errorText}</p>
            </div>
        );
    }

    const formChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
    const childrenWithCallback = React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type !== 'div') {
            // Clone the child element and add the formChange prop
            return React.cloneElement(child, { formChange });
        }
        return React.cloneElement(child);
          
    });

    return (
        <form onSubmit={handleSubmit}>
            {childrenWithCallback}
            {errBox}
            <input type="submit" value={name} 
            className="w-full bg-indigo-500 outline-2 h-10 rounded-lg hover:bg-indigo-400 hover:outline hover:outline-indigo-500 hover:outline-offset-2" />
        
        </form>
    );
}

// This  creates a sign in component for an email and password sign in
export default function SignInEmailPassword({ onSubmit, onForgotPassword, errorText }) {

    return (
        <>
            <AccountForm name="Sign In" onSubmit={onSubmit} errorText={errorText}>
                <InputBox type="email" name="email" placeholder="Email" label="Email Address"/>
                <PasswordInputBox visibiltyToggle={true} onFocus={() => {}} onChange={() => {}}/>
                <div className="mb-3 flex justify-end mx-2">
                    <button type="button" onClick={onForgotPassword} className="text-indigo-500 hover:text-indigo-400">Forgot Password?</button>
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

function PasswordRequirement({ done, children }) {
    return (
        <section className="flex justify-start items-center">
            <FaRegCheckCircle className={`mr-2 transition-colors duration-200 ${ done ? "text-green-600" : "text-red-600"}`}/>
            <h1 className={`text-slate-500 transition-all duration-200 decoration-2 ${done ? "line-through" : ""}`}>{children}</h1>
        </section>
    );
}

export function RegistrationEmailPassword({ onSubmit, errorText }) {
    
    const [ password, setPassword ] = useState("");
    const [ isMinCharacters, setIsMinCharacters ] = useState(false);
    const [ hasNumber, setHasNumber ] = useState(false);
    const [ passwordsMatch, setPasswordsMatch ] = useState(false);
    
    const submit = ({ email, password }) => {
        let valid = isMinCharacters && hasNumber && passwordsMatch; 


        if (valid) { 
            onSubmit({ email, password });
        }
    };

    const handlePassword = (value) => {
        setPassword(value);
        setIsMinCharacters(value.length >= 8);

        const regex = /\d/;
        setHasNumber(regex.test(value));
    }

    return (
        <AccountForm name="Register" onSubmit={submit} errorText={errorText}>
            <InputBox type="email" name="email"
            placeholder="Email" label="Email Address"/>
            <PasswordInputBox visibiltyToggle={true}
            onFocus={(focus) => {
               
            }}
            onChange={handlePassword}/>
            <div 
            className={`border-2 flex-shrink-0 border-slate-800 w-full rounded-lg h-auto mb-5 p-2 px-4`}>
                <PasswordRequirement done={isMinCharacters}>Atleast 8 Characters</PasswordRequirement>
                <PasswordRequirement done={hasNumber}>Must contain atleast 1 number</PasswordRequirement>
            </div>
            <ConfirmPasswordInputBox visibiltyToggle={true} onFocus={(f) => {}} onChange={(value) => {
                if (password === value) {
                    setPasswordsMatch(true);
                    return true; 
                }
                else {
                    setPasswordsMatch(false);
                    return false; 
                }
            }}/>
        </AccountForm>
    );
}