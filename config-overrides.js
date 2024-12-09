const webpack = require('webpack');

module.exports = function override(config) {
    // Add fallbacks for Node.js modules
    config.resolve.fallback = {
        ...config.resolve.fallback,
        process: require.resolve('process/browser'),
        path: false,
        fs: false,
        module: false,
    };

    // Add plugins
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]);

    // Add module rules
    config.module.rules.push({
        test: /\.m?js$/,
        resolve: {
            fullySpecified: false,
        },
    });

    return config;
};
