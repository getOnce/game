const path = require('path'),
    webpack = require('webpack'),
    fs = require('fs'),
    ClearDistPlugin = require('./lib/ClearDistPlugin.js'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin');
let entryDir = './public/js/',
    outputDir = './public/dist/';

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        entryDir + 'index.js'
    ],
    output: {
        path: outputDir,
        filename: 'index.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015',
                exclude: /node_modules/
            }
            
        ]
    },
    plugins: [
        //new ClearDistPlugin(outputDir),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        })
  ]
}