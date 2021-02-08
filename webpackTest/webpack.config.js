const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main2.js',
        path: path.resolve(__dirname, 'dist')
    },
    //mode: 'development'
    mode: 'production'
}