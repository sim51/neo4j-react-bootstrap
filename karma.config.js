var webpack = require('webpack');
var path = require('path');
var wConfig = require('./webpack.config');

process.env.UNIT_TEST = true;

wConfig.devtool= 'inline-source-map';

// https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
wConfig.externals = {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
};

wConfig.entry = {};

module.exports = function (config) {
    config.set({
        plugins: [
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-spec-reporter',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-chai',
            'karma-chai-as-promised'
        ],
        frameworks: [ 'mocha' ], //use the mocha test framework
        browsers: [ 'PhantomJS' ],
        files: [
            { pattern: 'test/**/*\.js' }
        ],
        preprocessors: {
            'src/**/*\.js': [ 'webpack', 'sourcemap'],
            'test/**/*\.js': [ 'webpack', 'sourcemap']
        },
        webpack: wConfig,
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },
        reporters: ['mocha', 'progress', 'coverage'],
        coverageReporter: {
            dir: 'build/coverage',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
            ]
        }
    });
};
