import React from "react";
import { ObjectType } from "../types/types";
import { useAppSelector } from "../redux/hooks";
import TopPanel from "../components/TopPanel/TopPanel";
import ToolBar from "../components/CreateObjectsPanel/ui/CreateObjectsPanel";
import Canvas from "../components/Canvas/Canvas";
import { ObjectView } from "../components/Objects/ui/objectView";
import { CreateObjectsPanel } from "../components/RightPanel/ui/CreateObjectsPanel";
import classes from "./mainPage.module.css";
import { useIsMultiplySelect } from "../hooks/useIsMultiplySelect";
import { useUndoRedoListeners } from "../hooks/useUndoRedoListeners";

const MainPage = () => {
  const objects = useAppSelector((state) => state.cardEditor.objects);
  const isMultiplySelect = useIsMultiplySelect();
  useUndoRedoListeners();

  return (
    <div>
      <TopPanel />
      <div className={classes.inlineContainer}>
        <ToolBar />
        <Canvas>
          {objects.map((object: ObjectType): React.ReactElement => {
            return (
              <ObjectView
                key={object.id}
                object={object}
                multiplySelect={isMultiplySelect}
              />
            );
          })}
        </Canvas>
        <CreateObjectsPanel />
      </div>
    </div>
  );
};

export { MainPage };
