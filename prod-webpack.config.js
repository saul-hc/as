const path = require("path");

const themeEntries = require('./MapStore2/build/themes.js').themeEntries;
const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const ModuleFederationPlugin = require('./MapStore2/build/moduleFederation').plugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};

module.exports = require('./MapStore2/build/buildConfig')(
    {
        'pru-mapstore-este-si': path.join(__dirname, "js", "app"),
        'pru-mapstore-este-si-embedded': path.join(__dirname, "js", "embedded"),
        'pru-mapstore-este-si-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api"),
        'geostory-embedded': path.join(__dirname, "js", "geostoryEmbedded"),
        "dashboard-embedded": path.join(__dirname, "js", "dashboardEmbedded")
    },
    themeEntries,
    paths,
    [extractThemesPlugin, ModuleFederationPlugin],
    true,
    "dist/",
    '.pru-mapstore-este-si',
    [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'indexTemplate.html'),
            chunks: ['pru-mapstore-este-si'],
            inject: "body",
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'embeddedTemplate.html'),
            chunks: ['pru-mapstore-este-si-embedded'],
            inject: "body",
            hash: true,
            filename: 'embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'apiTemplate.html'),
            chunks: ['pru-mapstore-este-si-api'],
            inject: 'head',
            hash: true,
            filename: 'api.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'geostory-embedded-template.html'),
            chunks: ['geostory-embedded'],
            inject: "body",
            hash: true,
            filename: 'geostory-embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'dashboard-embedded-template.html'),
            chunks: ['dashboard-embedded'],
            inject: 'body',
            hash: true,
            filename: 'dashboard-embedded.html'
        })
    ],
    {
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
);
