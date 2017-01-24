const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './client/jquery/app.js',
    output: {
        path: './server/public/jquery',
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            { context: './client/jquery', from: '**/*.html' }
        ])
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint'
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    devtool: 'source-map'
};
