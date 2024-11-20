import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";
import styles from './styles.module.css';

export default function Default({ imgPath }: { imgPath: string }): JSX.Element {
    return (
        <div className={styles.uiScreenshotContainer}>
            <img className={styles.uiScreenshot} src={useBaseUrl(imgPath)} alt={"Gauntlet Screenshot"}/>
        </div>
    )
}
