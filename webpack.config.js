const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env = {}) => {

    const { mode = 'production' } = env;

    if (mode === 'production') {

        // Production mode: create and save bundle to dist, lib packages excluded

        return {
            mode: 'production',
            entry: './src/index.js',
            externals: {
                react: {
                    commonjs: "react",
                    commonjs2: "react",
                    amd: "React",
                    root: "React"
                },
                "react-dom": {
                    commonjs: "react-dom",
                    commonjs2: "react-dom",
                    amd: "ReactDOM",
                    root: "ReactDOM"
                },
                'react-router-dom': 'react-router-dom',
                'prop-types': 'prop-types',
                'react-modern-calendar-datepicker': 'react-modern-calendar-datepicker',
                'react-select': 'react-select'
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    },{
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader'
                        ]
                    }
                ]
            },
            output: {
                filename: 'react-data-list.umd.js',
                library: 'dataList',
                libraryTarget: 'umd'
            },
            plugins: [
                new CopyPlugin({
                    patterns: [
                        {
                            from: 'src/themes',
                            to: 'themes'
                        },
                    ],
                }),
            ]
        }
    } else {

        // Development mode: create bundle, run dev server with example app

        return {
            mode: 'development',
            entry: './examples/index.js',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    },{
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader'
                        ]
                    }
                ]
            },
            output: {
                publicPath: '/'
            },
            devServer: {
                open: true,
                historyApiFallback: true
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: 'examples/index.html'
                }),
            ]
        }
    }
};