import React, { useRef } from "react";
import classes from "./TopPanel.module.css";
import DropDownButtons from "./DropDownButtons/DropDownButtons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { handleJSONLoad, saveAsJson } from "./model/actionHadlers";
import TopButton from "./TopButton/TopButton";
import { CardDataType } from "../../types/types";
import {
  redo,
  setCanvasSize,
  setFilter,
  setObjects,
  undo,
} from "../model/cardEditorSlice";
import { hideNotification, showNotification } from "./model/notificationSlice";
import html2canvas from "html2canvas";

type CanvasActionType = "Current Window" | "New Window";
type SaveActionType = "JPEG" | "PNG" | "JSON";
const canvasActions: CanvasActionType[] = ["Current Window", "New Window"];
const saveActions: SaveActionType[] = ["JPEG", "PNG", "JSON"];

const TopPanel = () => {
  const cardEditorState = useAppSelector((state) => state.cardEditor);
  const objectData = cardEditorState.objects;
  const filterData = cardEditorState.filter;
  const canvasData = cardEditorState.canvas;
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

  const saveCanvasImage = (format: "JPEG" | "PNG") => {
    const canvas = document.getElementById(
      "canvas",
    ) as HTMLCanvasElement | null;
    if (canvas) {
      html2canvas(canvas, {
        useCORS: true,
      })
        .then((canvasSnapshot) => {
          const link = document.createElement("a");
          switch (format) {
            case "JPEG":
              link.href = canvasSnapshot.toDataURL("image/jpeg");
              break;
            case "PNG":
              link.href = canvasSnapshot.toDataURL("image/png");
              break;
            default:
              link.href = canvasSnapshot.toDataURL("image/png");
              break;
          }

          link.download = "canvas_image." + format;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          showMessage("Saved successfully");
        })
        .catch(() => {
          showMessage("Failed to save");
        });
    }
  };

  const handleSaveAction = (action: SaveActionType) => {
    switch (action) {
      case "JPEG":
        saveCanvasImage(action);
        break;
      case "PNG":
        saveCanvasImage(action);
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

  function handleUndo() {
    dispatch(undo());
  }

  function handleRedo() {
    dispatch(redo());
  }

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
        <TopButton onClick={handleUndo}>Undo</TopButton>
        <TopButton onClick={handleRedo}>Redo</TopButton>
      </div>
    </>
  );
};

export default TopPanel;
