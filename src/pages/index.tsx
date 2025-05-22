import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import { ReactElement } from "react";

export default function Home(): ReactElement {
    return (
        <Layout
            description="Gauntlet Application Launcher Documentation"
            wrapperClassName={styles.layoutWrapper}
            noFooter={true}
        >
            <div className={styles.hazardTapeContainer}>
                <div className={styles.hazardTape}>
                    <span className={styles.hazardTapeText}>
                        Work In Progress
                    </span>
                    <span className={styles.hazardTapeSpacer}/>
                    <span className={styles.hazardTapeText}>
                        Work In Progress
                    </span>
                </div>
            </div>
            <Link
                className={"button button--primary button--lg " + styles.docsLink}
                to="/docs">
                Go To Documentation
            </Link>
            <Link
                className="button button--secondary button--lg"
                to="https://discord.gg/gFTqYUkBrW">
                Discord Server
            </Link>
        </Layout>
    );
}
