import type { ReactElement } from "react";

interface ButtonProps {
    variant : "primary" | "secondary" ;
    size : "sm"|"md"|"lg" ;
    text: string;
    startIcon ? : ReactElement;
    endIcon ? : ReactElement;
    onClick : () => void;
};

export const Button = (props:ButtonProps) => {

    const baseClasses = "flex items-center justify-center items-center"

    const variantClass = {
        primary : "bg-[#6F61C0] rounded-lg hover:bg-[#A084E8] cursor-pointer text-white",
        secondary : "rounded-lg  bg-[#F2F2F2] hover:bg-[#DDDDDD] cursor-pointer text-[#6F61C0]"
    }

    const sizeClass = {
        sm : "w-auto px-4 py-2 text-sm" ,
        md : "w-auto p-2 text-normal",
        lg : "w-auto px-12 py-3 text-xl"
    }

    return(
        <button
            onClick={props.onClick}
            className={` ${variantClass[props.variant]} ${sizeClass[props.size]}`}
        >
            <div className={baseClasses}>            
            {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
            <span>{props.text}</span>
            {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
            </div>

        </button>
    )
}