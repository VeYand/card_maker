import React, { useRef } from "react";
import classes from "./TopPanel.module.css";
import DropDownButtons from "./DropDownButtons/DropDownButtons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { handleJSONLoad, saveAsJson } from "./model/actionHadlers";
import TopButton from "./TopButton/TopButton";

type CanvasActionType = "Current Window" | "New Window";
type SaveActionType = "JPEG" | "PNG" | "JSON";
// type LoadActionType = "JSON";
const canvasActions: CanvasActionType[] = ["Current Window", "New Window"];
const saveActions: SaveActionType[] = ["JPEG", "PNG", "JSON"];

const TopPanel = () => {
  const objectData = useAppSelector((state) => state.objectsSlice.objects);
  const filterData = useAppSelector((state) => state.filterSlice);
  const canvasData = useAppSelector((state) => state.canvasSlice);
  const notificationData = useAppSelector((state) => state.notificationSlice);
  const jsonInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

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
        saveAsJson(data, dispatch);
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
          onChange={(event) => handleJSONLoad(event, dispatch)}
          style={{ display: "none" }}
        />
        <TopButton onClick={handleLoadAction}>Load json</TopButton>
      </div>
    </>
  );
};

export default TopPanel;
