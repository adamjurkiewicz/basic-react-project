import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    devtool: 'source-map',
    entry: {
        vendor : path.resolve(__dirname, 'src/vendor'),
        main : path.resolve(__dirname, 'src/index')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new WebpackMd5Hash(),
        new webpack.optimize.CommonsChunkPlugin({
            name : "vendor"
        }),
        new ExtractTextPlugin({
            filename: '[name].[chunkhash].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template : "src/index.html",
            minify: {
                removeComments : true,
                collapseWhitespaces: true,
                removeRedundantAttributes : true,
                useShortDoctype : true,
                removeEmptyAttributes : true,
                removeStyleLinkTypeAttributes : true,
                keepClosingSlash : true,
                minifyJS : true,
                minifyCSS : true,
                minifyURLs : true,
            },
            inject : true
        }),
        new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            noInfo: false,
        }),
    ],
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    }
}
