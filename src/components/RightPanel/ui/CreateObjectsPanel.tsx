import React from "react";
import classes from "./CreateObjectsPanel.module.css";

import { FilterBlock } from "../FilterBlock/ui/FilterBlock";
import ToolBlock from "../../RightPanel/ToolBlock/ToolBlock";

const CreateObjectsPanel = () => {
  return (
    <div className={classes.container}>
      <FilterBlock />
      <ToolBlock />
    </div>
  );
};

export { CreateObjectsPanel };
