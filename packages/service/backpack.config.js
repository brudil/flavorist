module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = [
      './src/service.ts'
    ];

    config.resolve = {
      extensions: [".ts", ".js", ".json"]
    };

    config.module.rules.push(
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    );

    config.target = 'node';

    return config;
  },
};
