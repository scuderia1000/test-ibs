let packageJSON = require('./package.json');
let path = require('path');
let webpack = require('webpack');
module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/static/generated'),
        filename: 'bundle.js'},
    resolve: {extensions: ['.js', '.jsx']},
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true}),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        port: 3000,
        contentBase: "./static",
        noInfo: false,
        quiet: false,
        lazy: false,
        watchOptions: {
            poll: false
        }
    }
};