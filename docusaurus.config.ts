import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import darculaTheme from "./darcula.theme";


const config: Config = {
    title: 'Gauntlet',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://gauntlet.sh',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    organizationName: 'project-gauntlet',
    projectName: 'website',
    deploymentBranch: 'gh-pages',

    trailingSlash: false,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    // TODO uncomment next page if you don't want to compile the Gauntlet
                    // path: "dummy",
                    sidebarPath: './sidebars.ts',
                    sidebarCollapsible: false,
                    editUrl: 'https://github.com/project-gauntlet/website/tree/main/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        colorMode: {
            defaultMode: "dark"
        },
        navbar: {
            title: 'Gauntlet',
            logo: {
                alt: 'Gauntlet Logo',
                src: 'img/logo.png',
                style: {
                    'border-radius': '8px'
                }
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'docsSidebar',
                    position: 'left',
                    label: 'Docs',
                },
                {
                    href: 'https://github.com/project-gauntlet/gauntlet',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Website',
                    items: [
                        {
                            label: 'Docs',
                            to: '/docs',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Discord',
                            href: 'https://discord.gg/gFTqYUkBrW',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/project-gauntlet/gauntlet',
                        },
                    ],
                },
            ],
            // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
            copyright: `Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: darculaTheme,
            additionalLanguages: ["toml"]
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
