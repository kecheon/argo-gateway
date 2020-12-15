"use strict;";

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

const config = {
    //mode: isProd ? "production" : "development",
    mode:"development",
    entry: {
        main: "./src/app/index.tsx"
    },
    output: {
        filename: "[name].[chunkhash].js",
        path: __dirname + "../../../dist/app"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".ttf"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: isProd ? [] : [
                    { loader: "react-hot-loader/webpack" }
                    , {
                        loader: 'ts-loader',
                        options: { allowTsInNodeModules:true, configFile:path.resolve("./src/app/tsconfig.json") }
                    }
                ]
            }, {
                enforce: 'pre',
                exclude: [/node_modules\/react-paginate/, /node_modules\/monaco-editor/,
                ],
                test: /\.js$/,
                use: isProd ?
                    [{ loader: 'source-map-loader' }, { loader: 'babel-loader' }] : [{ loader: 'source-map-loader' }]
            },{
                test: /\.scss$/,
                use: [{ loader: "style-loader!raw-loader!sass-loader" }]
            }, {
                test: /\.css$/,
                use: [{ loader: "style-loader!raw-loader" }]
            }, {
                test: /\.ttf$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        fallback: {
            fs: false
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
            SYSTEM_INFO: JSON.stringify({
                version: process.env.VERSION || "latest"
            })
        }),
        new HtmlWebpackPlugin({ template: "src/app/index.html" }),
        new CopyWebpackPlugin({ patterns: [{
                from: "node_modules/argo-ui/src/assets", to: "assets"
            }, {
                from: "node_modules/@fortawesome/fontawesome-free/webfonts", to: "assets/fonts"
            }, {
                from: 'node_modules/monaco-editor/min/vs/base/browser/ui/codicons/codicon/codicon.ttf', to: "."
            }]
        }),
        new MonacoWebpackPlugin({ "languages": ["json", "yaml"] })
    ]
};

module.exports = config;
