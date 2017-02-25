const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './client/react/app.js',
    output: {
        path: './server/public/react',
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            { context: './client/react', from: '**/*.html' }
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