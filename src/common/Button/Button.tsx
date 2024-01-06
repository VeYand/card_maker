import React, { ButtonHTMLAttributes, ReactNode } from "react"
import classes from "./Button.module.css"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode
    onClick?: () => void
}

const Button = ({ children, onClick, ...props }: IButton) => {
    return (
        <button {...props} className={classes.topButton} onClick={onClick}>
            {children}
        </button>
    )
}

export { Button }
