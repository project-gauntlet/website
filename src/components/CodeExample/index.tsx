import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import React from 'react';
import CodeBlock from "@theme/CodeBlock";
import UiScreenshot from "../UiScreenshot";
import styles from './styles.module.css';
import { Icon } from '@iconify/react'
import Link from "@docusaurus/Link";

interface GauntletGithubCodeEntrypointData {
    codeFilePathRootRelative: string
    codeFilePathPluginRelative: string
    codeSegments: {
        id: string,
        value: string,
        lines?: [number, number],
        screenshotFilePath: string,
    }[]
    manifestFilePathRootRelative: string
    manifestFilePathPluginRelative: string
    manifestSegment: {
        value: string
        manifestFileLines: [number, number]
    }
}

export default function Default({ data, screenshot }: { data: GauntletGithubCodeEntrypointData, screenshot?: boolean }): JSX.Element {
    function githubLink(rootRelativePath: string, lines?: [number, number]): string {
        if (lines) {
            const [startLine, endLine] = lines
            return `https://github.com/project-gauntlet/gauntlet/blob/main/${rootRelativePath}#L${startLine}-L${endLine}`;
        } else {
            return `https://github.com/project-gauntlet/gauntlet/blob/main/${rootRelativePath}`;
        }
    }

    let elements = data.codeSegments
        .map(value => {
            const label = value.id === "default" ? data.codeFilePathPluginRelative : `${data.codeFilePathPluginRelative} - ${value.id}`

            return (
                <TabItem key={value.id} value={value.id} label={label}>
                    <div className={styles.codeBlockOverlayContainer}>
                        <CodeBlock
                            language="jsx"
                            showLineNumbers
                        >
                            {value.value}
                        </CodeBlock>
                        <Link className={styles.codeBlockOverlayGithubIcon}
                              to={githubLink(data.codeFilePathRootRelative, value.lines)}>
                            <Icon icon="mdi:github" height="1.25em"/>
                        </Link>
                    </div>
                    {(screenshot ?? true) && <UiScreenshot imgPath={value.screenshotFilePath}/>}
                </TabItem>
            )
        });

    elements.push(
        <TabItem key="manifest" value="manifest" label="gauntlet.toml">
            <div className={styles.codeBlockOverlayContainer}>
                <CodeBlock language="toml">
                    {data.manifestSegment.value}
                </CodeBlock>
                <Link className={styles.codeBlockOverlayGithubIcon}
                      to={githubLink(data.manifestFilePathRootRelative, data.manifestSegment.manifestFileLines)}>
                    <Icon icon="mdi:github" height="1.25em"/>
                </Link>
            </div>
        </TabItem>
    )

    return (
        <Tabs>
            {elements}
        </Tabs>
    );
}
