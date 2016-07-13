module.exports = {
    entry: ["babel-polyfill", "whatwg-fetch", "./index.js"],
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/static/"
    },
    resolve: {
      extensions: ['', '.js']
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.css$/, exclude: /node_modules/, loader: 'style!css-loader?modules'}
        ]
    }
};
