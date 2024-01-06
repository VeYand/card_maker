import React from "react"
import classes from "./NotificationBlock.module.css"
import { useAppSelector } from "../../../redux/hooks"

const NotificationBlock = () => {
    const notificationData = useAppSelector((state) => state.notification)

    return (
        <div
            className={`${classes.appMessage} ${
                notificationData.isVisible ? classes.appMessageShow : ""
            }`}
        >
            {notificationData.message}
        </div>
    )
}

export { NotificationBlock }
