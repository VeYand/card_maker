import React, { useEffect } from "react";
import { ObjectType } from "../types/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setObjects } from "../components/Objects/model/objectsSlice";
import { objectList } from "../data/data";
import TopPanel from "../components/TopPanel/TopPanel";
import ToolBar from "../components/CreateObjectsPanel/ui/CreateObjectsPanel";
import Canvas from "../components/Canvas/ui/Canvas";
import { ObjectView } from "../components/Objects/ui/objectView";
import { CreateObjectsPanel } from "../components/RightPanel/ui/CreateObjectsPanel";
import classes from "./mainPage.module.css";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const objects = useAppSelector((state) => state.objects);

  useEffect(() => {
    dispatch(setObjects(objectList));
  }, []);

  return (
    <div>
      <TopPanel />
      <div className={classes.inlineContainer}>
        <ToolBar />
        <Canvas>
          {objects.map((object: ObjectType): React.ReactElement => {
            return <ObjectView key={object.id} object={object} />;
          })}
        </Canvas>
        <CreateObjectsPanel />
      </div>
    </div>
  );
};

export { MainPage };
