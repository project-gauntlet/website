import { EOL } from "node:os";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { parse as parseToml } from "toml";
import * as process from "node:process";
import dedent from "dedent";

interface GauntletGithubCodePluginData {
    pluginId: string
    entrypoints: GauntletGithubCodeEntrypointData[]
}

interface GauntletGithubCodeEntrypointData {
    entrypointId: string
    data: {
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
}

function findCodeSegments(fileContent: string): {
    id?: string,
    lines: string[],
    startIndex: number,
    endIndex?: number
}[] | undefined {
    const lines = fileContent.split(EOL);

    const startString = "docs-code-segment:start";
    const endString = "docs-code-segment:end";

    return lines
        .map<{ line: string, isStart: boolean, isEnd: boolean, id?: string, index: number }>((line, index) => {
            const isStart = line.includes(startString);
            const isEnd = line.includes(endString);

            const indexOneBased = index + 1;

            if (isStart) {
                const id = line.trim().split(startString).pop()?.trim();

                return { line, isStart, isEnd, id: id === "" ? undefined : id, index: indexOneBased };
            }

            return { line, isStart, isEnd, index: indexOneBased };
        })
        .reduce<{ id?: string, lines: string[], startIndex: number, endIndex?: number }[]>((acc, curr) => {
            if (curr.isStart) {
                acc.push({ id: curr.id, lines: [], startIndex: curr.index + 1 });
            } else if (curr.isEnd && acc.length > 0) {
                const accElement = acc[acc.length - 1];
                accElement.endIndex = curr.index - 1;
            } else if (acc.length > 0) {
                const accElement = acc[acc.length - 1];
                if (accElement.endIndex == undefined) {
                    accElement.lines.push(curr.line);
                }
            }
            return acc;
        }, [])
}

async function readCodeExampleData() {
    const appDocsPath = path.resolve(process.cwd(), '..', 'application')
    const scenariosDocsPath = path.resolve(appDocsPath, 'scenarios')
    const pluginsDocsPath = path.resolve(scenariosDocsPath, 'plugins')

    return (await readdir(pluginsDocsPath, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .map(pluginId => {
            const pluginDirPath = path.resolve(pluginsDocsPath, pluginId)
            const manifestFilePath = path.resolve(pluginDirPath, 'gauntlet.toml')
            const manifestFileRootRelativePath = path.relative(appDocsPath, manifestFilePath)
            const manifestFileRootPluginRelative = path.relative(pluginDirPath, manifestFilePath)

            const manifestFileContent = readFileSync(manifestFilePath, "utf8");

            const findCodeSegmentsResult = findCodeSegments(manifestFileContent);

            if (findCodeSegmentsResult == undefined) {
                throw new Error("segments not found")
            }

            const manifestSegmentsArr = findCodeSegmentsResult
                .map(manifestSegment => {
                    if (manifestSegment.id == null) {
                        throw new Error(`manifest file segment doesn't have id: ${manifestFilePath}`)
                    }

                    return [
                        manifestSegment.id,
                        {
                            segment: manifestSegment.lines.join(EOL),
                            startIndex: manifestSegment.startIndex,
                            endIndex: manifestSegment.endIndex!
                        }
                    ] as [string, { segment: string, startIndex: number, endIndex: number }]
                });

            const manifestSegmentMap = Object.fromEntries(manifestSegmentsArr)

            const manifest = parseToml(manifestFileContent) as { entrypoint: { id: string, path: string }[] }

            const entrypointData = manifest.entrypoint
                .map(entrypoint => {
                    let entrypointId = entrypoint.id;
                    let entrypointPath = entrypoint.path;
                    const codeFilePath = path.resolve(pluginDirPath, entrypointPath)
                    const codeFileRootRootRelativePath = path.relative(appDocsPath, codeFilePath)
                    const codeFileRootPluginRelativePath = path.relative(pluginDirPath, codeFilePath)

                    const codeFileContent = readFileSync(codeFilePath, "utf8");
                    const codeSegments = findCodeSegments(codeFileContent);

                    const codeSegmentsResult: GauntletGithubCodeEntrypointData['data']['codeSegments'] = [];
                    if (codeSegments.length == 0) {
                        const id = "default";

                        const screenshotFilePath = path.resolve('/img', 'screenshots', pluginId, entrypointId, `${id}.png`)

                        codeSegmentsResult.push({
                            id: id,
                            value: codeFileContent,
                            screenshotFilePath
                        })
                    } else if (codeSegments.length == 1) {
                        const [codeSegment] = codeSegments
                        if (codeSegment.id != null) {
                            throw new Error(`code file segment has id: ${codeSegment.id}, ${codeFilePath}`)
                        }

                        const id = "default";

                        const screenshotFilePath = path.resolve('/img', 'screenshots', pluginId, entrypointId, `${id}.png`)

                        codeSegmentsResult.push({
                            id,
                            value: dedent(codeSegment.lines.join(EOL)),
                            lines: [codeSegment.startIndex, codeSegment.endIndex!],
                            screenshotFilePath
                        })
                    } else {
                        codeSegmentsResult.push(
                            ...codeSegments.map(codeSegment => {
                                if (codeSegment.id == null) {
                                    throw new Error(`code file segment doesn't have id: ${codeFilePath}`)
                                }

                                const screenshotFilePath = path.resolve('/img', 'screenshots', pluginId, entrypointId, `${codeSegment.id}.png`)

                                return {
                                    id: codeSegment.id,
                                    value: dedent(codeSegment.lines.join(EOL)),
                                    lines: [codeSegment.startIndex, codeSegment.endIndex!] as [number, number],
                                    screenshotFilePath
                                }
                            })
                        )
                    }

                    const manifestSegment = manifestSegmentMap[entrypointId]

                    if (manifestSegment == null) {
                        throw new Error(`manifest not found for plugin id '${pluginId}' and entrypoint id '${entrypointId}'`)
                    }

                    return {
                        entrypointId,
                        data: {
                            codeFilePathRootRelative: codeFileRootRootRelativePath,
                            codeFilePathPluginRelative: codeFileRootPluginRelativePath,
                            codeSegments: codeSegmentsResult,
                            manifestFilePathRootRelative: manifestFileRootRelativePath,
                            manifestFilePathPluginRelative: manifestFileRootPluginRelative,
                            manifestSegment: {
                                value: manifestSegment.segment,
                                manifestFileLines: [manifestSegment.startIndex, manifestSegment.endIndex!],
                            },
                        }
                    } satisfies GauntletGithubCodeEntrypointData
                })

            return {
                pluginId,
                entrypoints: entrypointData
            }
        });
}

async function generateCodeExample(generatedPath: string, data: GauntletGithubCodePluginData[]) {
    const generatedPathCodeExample = path.resolve(generatedPath, 'code_example')

    mkdirSync(generatedPathCodeExample, { recursive: true })

    for (const plugin of data) {
        const dir = path.resolve(generatedPathCodeExample, plugin.pluginId)
        mkdirSync(dir)
    }

    for (const plugin of data) {
        for (const entrypoint of plugin.entrypoints) {

            const jsxPath = path.resolve(generatedPathCodeExample, plugin.pluginId, `${entrypoint.entrypointId}.tsx`)

            createJsxWithDataInput("CodeExample", jsxPath, entrypoint.data)
        }
    }
}

function readComponentModel(): any {
    const componentModelPath = path.resolve(process.cwd(), 'component_model.json')

    return JSON.parse(readFileSync(componentModelPath, { encoding: "utf-8" }))
}


async function generatePropertyTables(generatedPath: string, components: any) {
    const generatedTablesPath = path.resolve(generatedPath, 'tables')

    mkdirSync(generatedTablesPath)

    for (const component of components) {
        switch (component.type) {
            case "text_part": {
                break
            }
            case "root": {
                break
            }
            case "standard": {
                const generatedTablesComponentPath = path.resolve(generatedTablesPath, component.internalName)

                mkdirSync(generatedTablesComponentPath)

                createJsxWithDataInput(
                    "Description",
                    path.resolve(generatedTablesComponentPath, `description.tsx`),
                    {
                        description: component.description,
                    }
                )

                if (component.props.length !== 0) {
                    createJsxWithDataInput(
                        "PropsTable",
                        path.resolve(generatedTablesComponentPath, `props.tsx`),
                        {
                            internalName: component.internalName,
                            props: component.props
                        }
                    )
                }

                switch (component.children.type) {
                    case "none":
                        break;
                    case "string": {

                        createJsxWithDataInput(
                            "OrderedMembersTable",
                            path.resolve(generatedTablesComponentPath, `ordered-members.tsx`),
                            {
                                tableKey: component.internalName,
                                members: {},
                                withString: true
                            }
                        )

                        break;
                    }
                    case "members": {

                        if (Object.entries(component.children.ordered_members).length !== 0) {
                            createJsxWithDataInput(
                                "OrderedMembersTable",
                                path.resolve(generatedTablesComponentPath, `ordered-members.tsx`),
                                {
                                    tableKey: component.internalName,
                                    members: component.children.ordered_members,
                                    withString: false
                                }
                            )
                        }

                        if (Object.entries(component.children.per_type_members).length !== 0) {
                            createJsxWithDataInput(
                                "PerTypeMembersTable",
                                path.resolve(generatedTablesComponentPath, `per-type-members.tsx`),
                                {
                                    tableKey: component.internalName,
                                    members: component.children.per_type_members,
                                }
                            )
                        }

                        break;
                    }
                    case "string_or_members": {
                        createJsxWithDataInput(
                            "OrderedMembersTable",
                            path.resolve(generatedTablesComponentPath, `ordered-members.tsx`),
                            {
                                tableKey: component.internalName,
                                members: component.children.ordered_members,
                                withString: true
                            }
                        )

                        if (Object.entries(component.children.per_type_members).length !== 0) {
                            createJsxWithDataInput(
                                "PerTypeMembersTable",
                                path.resolve(generatedTablesComponentPath, `per-type-members.tsx`),
                                {
                                    tableKey: component.internalName,
                                    members: component.children.per_type_members,
                                }
                            )
                        }

                        break;
                    }
                }
            }
        }
    }
}

function createJsxWithDataInput(name: string, filePath: string, data: object) {
    const pre = `
import ${name} from '@site/src/components/${name}';
import React from "react";
import { Buffer } from "buffer";
const data = JSON.parse(Buffer.from(\`
`

    const serializedData = Buffer.from(JSON.stringify(data), "utf-8").toString('base64');

    const post = `
\`, 'base64').toString('utf-8'));
export default function Default(): JSX.Element {
    return (
        <${name} data={data}/>
    );
}
`

    writeFileSync(filePath, `${pre}${serializedData}${post}\n`)
}

async function run() {
    const generatedPath = path.resolve(process.cwd(), '..', 'src', 'generated')
    rmSync(generatedPath, { recursive: true, force: true })

    await generateCodeExample(generatedPath, await readCodeExampleData())

    await generatePropertyTables(generatedPath, readComponentModel())
}

await run()