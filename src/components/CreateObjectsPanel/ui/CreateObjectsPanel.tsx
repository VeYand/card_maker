import React from "react";
import classes from "./CreateObjectsPanel.module.css";
import { ImageImportBlock } from "../ImageImportBlock/ImageImportBlock";
import { CreateTextBlock } from "../CreateTextBlock/CreateTextBlock";
import { CreateArtObjectBlock } from "../CreateArtObjectBlock/CreateArtObjectBlock";

const CreateObjectsPanel = () => {
  return (
    <div className={classes.container}>
      <ImageImportBlock />
      <CreateTextBlock />
      <CreateArtObjectBlock />
    </div>
  );
};

export default CreateObjectsPanel;
