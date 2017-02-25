const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './client/react/index.js',
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
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    devtool: 'source-map'
};