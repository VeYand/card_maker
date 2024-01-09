import React, { useEffect } from "react"
import { CardDataType, ObjectType } from "../../types/types"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { TopPanel } from "../../components/TopPanel/ui/TopPanel"
import { Canvas } from "../../components/Canvas/ui/Canvas"
import { ObjectView } from "../../components/Objects/ui/ObjectView"
import { RightPanel } from "../../components/RightPanel/ui/RightPanel"
import classes from "./CardEditorPage.module.css"
import { useIsMultiplySelect } from "../../hooks/useIsMultiplySelect"
import { useUndoRedoListeners } from "../../hooks/useUndoRedoListeners"
import { CreateObjectsPanel } from "../../components/CreateObjectsPanel/ui/CreateObjectsPanel"
import { NotificationBlock } from "../../components/NotificationBlock/ui/NotificationBlock"
import { setCardState } from "../../model/cardEditorSlice"

interface ICardEditorPage {
    selectedTemplate?: CardDataType
}

const CardEditorPage = ({ selectedTemplate }: ICardEditorPage) => {
    const objects = useAppSelector((state) => state.cardEditor.objects)
    const isMultiplySelect = useIsMultiplySelect()
    useUndoRedoListeners()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (selectedTemplate) {
            dispatch(setCardState(selectedTemplate))
        }
    }, [dispatch])

    return (
        <div>
            <NotificationBlock />
            <TopPanel />
            <div className={classes.inlineContainer}>
                <CreateObjectsPanel />
                <Canvas>
                    {objects.map((object: ObjectType): React.ReactElement => {
                        return (
                            <ObjectView
                                key={object.id}
                                object={object}
                                multiplySelect={isMultiplySelect}
                            />
                        )
                    })}
                </Canvas>
                <RightPanel />
            </div>
        </div>
    )
}

export { CardEditorPage }
