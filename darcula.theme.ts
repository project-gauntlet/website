import { PrismTheme } from "prism-react-renderer";

// https://github.com/LucaScorpion/prismjs-darcula-theme/blob/main/darcula.scss

const background = "#2b2b2b";
const foreground = "#a3b7c6";
const comment = "#808080";

const orange = "#cc7832";
const yellow = "#e8bf6a";
const brightYellow = "#bbb529";
const green = "#6a8759";
const brightGreen = "#a5c261";
const purple = "#9876aa";
const blue = "#6897bb";
const brown = "#8a653b";

export default {
    plain: {
        color: foreground,
        background: background,
    },
    styles: [
        {
            types: ["comment"],
            style: {
                color: comment,
            }
        },
        {
            types: ["keyword", "boolean", "constant", "null", "important", "rule"],
            style: {
                color: orange,
            }
        },
        {
            types: ["number"],
            style: {
                color: blue,
            }
        },
        {
            types: ["doctype", "function", "selector"],
            style: {
                color: yellow,
            }
        },
        {
            types: ["tag"],
            style: {
                color: yellow,
            }
        },
        {
            types: ["literal-property"],
            style: {
                color: foreground,
            }
        },
        {
            types: ["attr-name"],
            style: {
                color: foreground,
            }
        },
        {
            types: ["attr-value"],
            style: {
                color: brightGreen,
            }
        },
        {
            types: ["string", "regex", "char"],
            style: {
                color: green,
            }
        },
        {
            types: ["doc-comment"],
            style: {
                color: green,
                fontStyle: "italic",
            }
        },
        {
            types: ["keyword"],
            style: {
                color: orange,
            }
        },
        {
            types: ["parameter"],
            style: {
                color: brown,
            }
        },
        {
            types: ["annotation"],
            style: {
                color: brightYellow,
            }
        },
        {
            types: ["constant"],
            style: {
                color: purple,
            }
        },
        {
            types: ["important"],
            style: {
                fontWeight: "bold",
            }
        },
        {
            types: ["bold"],
            style: {
                fontWeight: "bold",
            }
        },
        {
            types: ["italic"],
            style: {
                fontStyle: "italic",
            }
        },
        {
            types: ["entity"],
            style: {
                cursor: "help",
            }
        },
        {
            languages: ["toml"],
            types: ["table"],
            style: {
                color: orange,
            }
        },
        {
            languages: ["toml"],
            types: ["key"],
            style: {
                color: orange,
            }
        },
    ]
} satisfies PrismTheme
