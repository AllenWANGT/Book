module.exports = require('./webpack.config.js')({
    isProduction: false,
    devtool: 'cheap-module-eval-source-map',
    port: 3000,
    analyzer: false,
});
