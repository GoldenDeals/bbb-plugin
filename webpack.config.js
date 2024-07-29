module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'FiveplasPlugin.js',
        library: 'FiveplasPlugin',
        libraryTarget: 'umd',
        publicPath: '/static/',
        globalObject: 'this',
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        allowedHosts: 'all',
        port: 4701,
        host: 'localhost',
        hot: false,
        liveReload: false,
        client: {
            overlay: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimize: false
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
    },
};
