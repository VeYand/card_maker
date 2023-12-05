import React, { ReactNode } from "react";
import styles from "./Canvas.module.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { resetAllSelections } from "../../Objects/model/objectsSlice";

interface CanvasProps {
  children?: ReactNode;
}

const Canvas = (props: CanvasProps) => {
  const canvasSize = useAppSelector((state) => state.canvas);
  const filter = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.canvasWrapper}>
      <canvas
        width={canvasSize.width}
        height={canvasSize.height}
        style={{ display: "none" }}
      >
        {props.children}
      </canvas>
      <div
        className={styles.canvas}
        style={{ width: canvasSize.width, height: canvasSize.height }}
        onClick={() => {
          dispatch(resetAllSelections());
        }}
      >
        {props.children}
        <div
          className={styles.filter}
          style={{
            backgroundColor: `rgba(${filter.r}, ${filter.g}, ${filter.b}, ${filter.a})`,
          }}
        />
      </div>
    </div>
  );
};

export default Canvas;
