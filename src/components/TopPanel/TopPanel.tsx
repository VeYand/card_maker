import React, { useRef } from "react";
import classes from "./TopPanel.module.css";
import DropDownButtons from "./DropDownButtons/DropDownButtons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { handleJSONLoad, saveAsJson } from "./model/actionHadlers";
import TopButton from "./TopButton/TopButton";
import { CardDataType } from "../../types/types";
import { setFilter } from "../RightPanel/FilterBlock/model/filterSlice";
import { setCanvasSize } from "../Canvas/model/canvasSlice";
import { setObjects } from "../Objects/model/objectsSlice";
import { hideNotification, showNotification } from "./model/notificationSlice";

type CanvasActionType = "Current Window" | "New Window";
type SaveActionType = "JPEG" | "PNG" | "JSON";
// type LoadActionType = "JSON";
const canvasActions: CanvasActionType[] = ["Current Window", "New Window"];
const saveActions: SaveActionType[] = ["JPEG", "PNG", "JSON"];

const TopPanel = () => {
  const objectData = useAppSelector((state) => state.objects);
  const filterData = useAppSelector((state) => state.filter);
  const canvasData = useAppSelector((state) => state.canvas);
  const notificationData = useAppSelector((state) => state.notification);
  const jsonInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const showMessage = (message: string, time = 3000) => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(hideNotification());
    }, time);
  };

  const data = {
    canvas: canvasData,
    filter: filterData,
    objects: objectData,
  };
  const handleCanvasAction = (action: CanvasActionType) => {
    switch (action) {
      case "Current Window":
        console.log(action);
        break;
      case "New Window":
        console.log(action);
        break;
      default:
        break;
    }
  };

  const handleSaveAction = (action: SaveActionType) => {
    switch (action) {
      case "JPEG":
        console.log(action);
        break;
      case "PNG":
        console.log(action);
        break;
      case "JSON":
        saveAsJson(data, showMessage);
        break;
      default:
        break;
    }
  };
  const handleLoadAction = () => {
    if (jsonInputRef.current?.value) {
      jsonInputRef.current.value = "";
    }
    jsonInputRef.current?.click();
  };

  const loadCard = (cardData: CardDataType | null, errorMessage?: string) => {
    if (cardData) {
      dispatch(setFilter(cardData.filter));
      dispatch(setCanvasSize(cardData.canvas));
      dispatch(setObjects(cardData.objects));
      showMessage("Loaded successfully");
    } else {
      showMessage(`${errorMessage}`);
    }
  };

  return (
    <>
      <div
        className={`${classes.appMessage} ${
          notificationData.isVisible ? classes.appMessageShow : ""
        }`}
      >
        {notificationData.message}
      </div>
      <div className={classes.topPanel}>
        <DropDownButtons
          parentButtonName={"New canvas"}
          childButtonNames={canvasActions}
          onSelect={handleCanvasAction}
        />
        <DropDownButtons
          parentButtonName={"Save as"}
          childButtonNames={saveActions}
          onSelect={handleSaveAction}
        />
        <input
          type="file"
          accept=".json"
          ref={jsonInputRef}
          onChange={(event) => handleJSONLoad(event, loadCard)}
          style={{ display: "none" }}
        />
        <TopButton onClick={handleLoadAction}>Load json</TopButton>
      </div>
    </>
  );
};

export default TopPanel;
