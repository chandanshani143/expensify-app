const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    //loader for webpack
    module: {
        rules: [{
            loader: 'babel-loader',                                 //name of loader we are trying to use
            test: /\.js$/,                                           //what files we want to run loader on
            exclude: /node_modules/                                  //exclude files to run via loader
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'                                         //it works with node-sass behind the scenes and gets jpb done
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true                                      //this tells the devserver that we are handling routing via client side code and it should return index.html for all 404 routes
    }
};