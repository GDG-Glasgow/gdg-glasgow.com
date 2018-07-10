const path = require('path'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
    CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({filename: './assets/css/app.css'});
const CompressionPlugin = require('compression-webpack-plugin');

const config = {

    // absolute path for project root
    context: path.resolve(__dirname, 'src'),

    entry: {
        // relative path declaration
        app: './app.js',
    },

    output: {
        // absolute path declaration
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/js/[hash].bundle.js',
        chunkFilename: "[chunkhash].js"
    },

    module: {
        rules: [

            // babel-loader with 'env' preset
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: {loader: "babel-loader", options: {presets: ['env']}}
            },
            // html-loader
            {test: /\.html$/, use: ['html-loader']},
            // sass-loader with sourceMap activated
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
                use: extractPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            // file-loader(for images)
            {
                test: /\.(jpg|png|gif|svg|ico)$/,
                use: [{loader: 'file-loader', options: {name: '[name].[ext]', outputPath: './assets/media/'}}]
            },
            // file-loader(for fonts)
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, use: [{
                    loader: 'file-loader', options: {name: '[name].[ext]', outputPath: 'fonts/'}
                }]
            }

        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        // cleaning up only 'dist' folder
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CspHtmlWebpackPlugin({
            'default-src': "'self'",
            'script-src': ["'self'", "https://api.meetup.com", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
            'style-src': ["'self'", "https://use.fontawesome.com", "https://fonts.googleapis.com"],
            'img-src': ["'self'", "https://www.google-analytics.com"],
            'font-src': ["'self'", "https://fonts.googleapis.com", "https://use.fontawesome.com", "https://fonts.gstatic.com", "data"],
            'connect-src': ["*", "https://api.meetup.com"],
            'media-src': "'self'",
            'object-src': "'self'",
            'child-src': "'self'",
            'frame-src': "'self'",
            'worker-src': "'self'",
            'form-action': ["'self'", "https://formspree.io"],
        }, {
            hashingMethod: 'sha512',
            enabled: true
        }),
        new CompressionPlugin({
            cache: true,
        }),

        // extract-text-webpack-plugin instance
        extractPlugin
    ],

    devServer: {
        // static files served from here
        contentBase: path.resolve(__dirname, "./dist/assets/media"),
        compress: true,
        // open app in localhost:2000
        port: 2000,
        stats: 'errors-only',
        open: true
    },

    devtool: 'inline-source-map'

};

module.exports = config;
