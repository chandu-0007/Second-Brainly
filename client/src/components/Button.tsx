import type { ReactElement } from "react";

export interface ButtonProps {
    varaient : "primary" | "secondary";
    size : "sm" | "lg" | "md";
    text : string ; 
    OnClickHandler : ()=> void ; 
    startIcon : ReactElement ;
}
export default function Button( props : ButtonProps){
    const {varaient, size , text , OnClickHandler , startIcon } = props 
     const varaientClass =  varaient === "primary"? "bg-indigo-600 text-white ":"bg-indigo-100 text-indigo-600"
     const sizeclasss = size === "lg" ? "h-10 w-35 ":size === "md" ? "h-10 w-20":"h-8 w-15 ";
       
     
    return (
        <>
        <div>
            <button className={`flex flex-row ${varaientClass} ${sizeclasss} rounded-lg  m-2  p-1 gap-2 items-center justify-center`} onClick={OnClickHandler}  >
               <span>{startIcon}</span>
               <span>{text}</span>
            </button>
        </div>
        </>
    )
}