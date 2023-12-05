import React, { useState } from "react";
import classes from "./DropDownButtons.module.css";
import TopButton from "../TopButton/TopButton";

interface IDropDownButtons<ActionType> {
  parentButtonName: string;
  childButtonNames: string[];
  onSelect: (value: ActionType) => void;
}

const DropDownButtons = <ActionType extends string>({
  parentButtonName,
  childButtonNames,
  onSelect,
}: IDropDownButtons<ActionType>) => {
  const [isDropped, setIsDropped] = useState<boolean>(false);

  const toggleDropDown = () => {
    setIsDropped(!isDropped);
  };

  return (
    <div className={classes.buttonContainer}>
      <TopButton onClick={toggleDropDown}>{parentButtonName}</TopButton>
      {isDropped ? (
        <div className={classes.popup}>
          {childButtonNames.map((buttonName: string) => {
            return (
              <TopButton
                key={buttonName}
                onClick={() => {
                  toggleDropDown();
                  onSelect(buttonName as ActionType);
                }}
              >
                {buttonName}
              </TopButton>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default DropDownButtons;
