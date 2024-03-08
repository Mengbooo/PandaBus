const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  assetsDir: 'public',
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.hust.online/hustbus/api/v1',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    host: 'localhost',
    port: 8080,
  },
  transpileDependencies: true,
})