import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>


 export function Input (props: InputProps){
    return (
       <input
       className=" text-black bg-yellow-50 border border-white-600 h-9 rounded-md outline-none px-2 mb-3"  
        {...props}
          />
   
    )
 }