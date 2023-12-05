import React, { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./TopButton.module.css";

interface TopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
}

const TopButton: React.FC<TopButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <button {...props} className={classes.topButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default TopButton;
