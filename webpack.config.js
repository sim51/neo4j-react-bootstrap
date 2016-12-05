var webpack = require('webpack');
var path = require('path');
var argv = require('yargs').argv;
var glob = require('glob');

// Host port, and base URL
var host = 'localhost';
var port = 8080;
var baseUrl = '/';
// Paths
var basePath = path.resolve(__dirname);
var paths = {
    base: basePath,
    nodeModules: path.join(basePath, 'node_modules'),
    app: path.join(basePath, 'src'),
    index: path.join(basePath, 'src/index.html'),
    build: path.join(basePath, 'dist')
};

// Internal flags - Don't edit these!!!!1
var DEBUG = !argv.release;
var DEV_SERVER_URL = ['http', '//' + host, port].join(':');

var wConfig = {
    module: {
        loaders: [
            // These enable JSX and ES6 support
            {
                test: /\.js?$/,
                exclude: [paths.nodeModules],
                loaders: (function () {
                    var loaders = ['babel-loader'];
                    // Add in the `react-hot-loader` in DEBUG mode
                    if (DEBUG) {
                        loaders.unshift('react-hot');
                    }

                    return loaders;
                }())
            },
            {
                test: /.*\/sigma.*\.js?$/,
                exclude: [paths.app],
                loaders: ['script']
            }, 
            // CSS and LESS support here :)
            {
                test: /\.css$/,
                loaders: [
                    'style',
                    'css'
                ]
            },
            {
                test: /\.less$/,
                loaders: [
                    'style',
                    'css',
                    'less'
                ]
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    // see https://github.com/request/request/issues/1529
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        readline: 'empty',
        vertx: 'empty'
    }
};

// Entry points - In production we'll have only the `main.jsx` entry.
// However in DEBUG, we'll enable Webpacks "Hot Module Replacement"
// functionality for fast development!
wConfig.entry = {
    main: path.join(paths.app, 'js/index')
};

if (DEBUG) {
    var entries = {};
    var defaultEntries = ['webpack-dev-server/client?' + DEV_SERVER_URL, 'webpack/hot/only-dev-server'];
    // Adding default entries
    entries['main'] = defaultEntries.concat(wConfig.entry.main);
    wConfig.entry = entries;
}

// Output definition - We'll build into a single app.js file by default
wConfig.output = {
    filename: '[name].bundle.js',
    publicPath: baseUrl,
    path: paths.build
};


// Plugins
wConfig.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
];

if (DEBUG) {
    // Hot Module Replacement ftw
    wConfig.plugins = wConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin()
    ]);
    wConfig.devServer = {
        hot: true
    }
}
else {
    // Minification and merging in production for small(ish) builds!
    wConfig.plugins = wConfig.plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]);
}

// We'll turn caching on in DEBUG for improved performance when doing
// incremenetal builds
wConfig.cache = DEBUG;

// DEBUG mode enabled for our loaders... in DEBUG mode only, ofcourse!
wConfig.debug = DEBUG;

// We'll inline the source maps when in DEBUG
wConfig.devtool = DEBUG ? '#inline-source-map' : false;

// ESLint specific stuff
wConfig.eslint = {
    configFile: path.resolve(__dirname, '.eslintrc')
};


module.exports = wConfig;



