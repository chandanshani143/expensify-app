const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
}


module.exports = (env) => {                          //we can export an webpack.config object directy or we can export a funtion that return an webpack.config object
    const isProduction = env === 'production';       //we are checking if env is equal to production if not then webpack will run without production optimization
    const MiniCssExtract = new MiniCssExtractPlugin({
        filename: 'styles.css'
    });

    return {
        mode: 'development',
        entry: ['@babel/polyfill','./src/app.js'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
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
                    MiniCssExtractPlugin.loader,
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
                ]
            }]
        },
        plugins: [
            MiniCssExtract,
            new webpack.DefinePlugin({                                              //to send process.env variables to client side js in bundle.js            
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
                'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',          //source-map is used for detecting error in the specific place and tell wheere the console.log comes from
        devServer: {                                                                    //for production we use source-map which is slow but get things done as we are gonna change things quite often in production
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,                                      //this tells the devserver that we are handling routing via client side code and it should return index.html for all 404 routes
            publicPath: '/dist/'
        }
    };
};