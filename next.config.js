const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
  target: 'serverless',
  webpack: config => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        navigateFallback: '/index',
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    )
    return config
  }
}
