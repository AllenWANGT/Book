const path = require('path');
const Autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (options) => {
    const CSSLoader = {
        loader: 'css-loader',
        options: {
            modules: false,
            sourceMap: true,
        },
    };
    const CSSModuleLoader = {
        loader: 'css-loader',
        options: {
            modules: true,
            sourceMap: true,
            localIdentName: options.isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
        },
    };
    const postCSSLoader = {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            sourceMap: true,
            plugins: () => [
                Autoprefixer(),
            ],
        },
    };
    const webpackConfig = {
        mode: options.isProduction ? 'production' : 'development',
        devtool: options.devtool,
        entry: path.resolve(__dirname, '../src/index.js'),
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: 'assets/bundle-[hash].js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
        module: {
            rules: [{
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader',
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: 'html-loader',
                        options: { minimize: true },
                    }],
                },
                {
                    test: /\.css$/,
                    exclude: /\.module\.css$/,
                    use: [
                        options.isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        CSSLoader,
                        postCSSLoader,
                        'sass-loader',
                    ],
                    sideEffects: true,
                },
                {
                    test: /\.module\.css$/,
                    use: [
                        options.isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        CSSModuleLoader,
                        postCSSLoader,
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(scss|sass)$/,
                    exclude: /\.module\.(scss|sass)$/,
                    use: [
                        options.isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        CSSLoader,
                        postCSSLoader,
                        'sass-loader',
                    ],
                    sideEffects: true,
                },
                {
                    test: /\.module\.(scss|sass)$/,
                    use: [
                        options.isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        CSSModuleLoader,
                        postCSSLoader,
                        'sass-loader',
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        options.isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        CSSModuleLoader,
                        postCSSLoader,
                        'less-loader',
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                        },
                    }],
                },
            ],
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './public/index.html',
                chunksSortMode: 'none',
                minify: {
                    removeAttributeQuotes: true,
                },
                hash: true, // 为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            }),
            new MiniCssExtractPlugin({
                filename: options.isProduction ? 'assets/[name].[hash].css' : 'assets/[name].css',
                chunkFilename: options.isProduction ? '[id].[hash].css' : '[id].css',
            }),
            Autoprefixer,
            new CompressionPlugin({
                filename: '[path].gz[query]',
                test: new RegExp('\\.(js|css)$'),
                threshold: 10240,
            })
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({ // 压缩js
                    sourceMap: true, // Use source maps to map error message locations to modules
                    parallel: true, // Use multi-process parallel running to improve the build speed
                }),
                new OptimizeCssAssetsPlugin(), // 压缩css
            ],
        },
    };
    // Config dev server
    if (!options.isProduction) {
        webpackConfig.devServer = {
            contentBase: path.resolve(__dirname, '../public'),
            host: 'localhost',
            compress: true,
            port: options.port,
            publicPath: '/',
            historyApiFallback: true
        };
    }
    // Config Bundle Analyzer
    if (!options.isProduction && options.analyzer) {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8081 }));
    }
    return webpackConfig;
};