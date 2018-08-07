const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
  // 基本路径
  baseUrl: '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config)=>{
    config.resolve.alias
        .set('common_Components',resolve('~src/components/common'))
},
  // configureWebpack: () => {},
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: true,
  // css相关配置
  css: {
  //   // 是否使用css分离插件 ExtractTextPlugin
  //   extract: true,
  //   // 开启 CSS source maps?
  //   sourceMap: false,
  //   // css预设器配置项
    loaderOptions: {
      sass: {
        data:`@import './src/assets/style/mixins.scss';`
      }
    },
  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    // host: '0.0.0.0',
    host: 'localhost',
    port: 8081,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      "/carrots-admin-ajax/": {
        "target": "http://dev.admin.carrots.ptteng.com/",
        "secure": false,
        "pathRewrite": {
              "^/carrots-admin-ajax/": ""
             },
       "changeOrigin": true,
       "logLevel": "debug"
     } /* 配置反向代理 ，暂时配置任务6-10的地址，此地址需要改动 */
    }
  },
  // 第三方插件配置
  // pluginOptions: {
  // // ...
  // }
}