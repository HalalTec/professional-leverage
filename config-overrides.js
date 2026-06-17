const webpack = require('webpack');

function addTailwindToPostCSS(config) {
    const rules = config.module.rules.find(r => Array.isArray(r.oneOf));
    if (!rules) return;

    rules.oneOf.forEach(rule => {
        const loaders = Array.isArray(rule.use) ? rule.use : [];
        loaders.forEach(loader => {
            if (
                typeof loader === 'object' &&
                loader.loader &&
                loader.loader.includes('postcss-loader') &&
                loader.options &&
                loader.options.postcssOptions
            ) {
                const plugins = loader.options.postcssOptions.plugins;
                if (Array.isArray(plugins)) {
                    loader.options.postcssOptions.plugins = [
                        require('@tailwindcss/postcss'),
                        ...plugins,
                    ];
                }
            }
        });
    });
}

module.exports = function override(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        process: require.resolve('process/browser'),
        path: false,
        fs: false,
        module: false,
    };

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]);

    config.module.rules.push({
        test: /\.m?js$/,
        resolve: {
            fullySpecified: false,
        },
    });

    addTailwindToPostCSS(config);

    return config;
};
