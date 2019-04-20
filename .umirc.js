const path = require('path');

export default {
  base:"/buy/",
  publicPath:"/buy/",
  treeShaking: true,
  hash:true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'xiaoma_buy',
        dll: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: false,
  },
  disableCSSModules: true,
  sass: {},
  targets: {
    ie: 11,
  },
  alias: {
    components: path.resolve(__dirname, 'src/components'),
    utils: path.resolve(__dirname, 'src/utils'),
    services: path.resolve(__dirname, 'src/services'),
    models: path.resolve(__dirname, 'src/models'),
    themes: path.resolve(__dirname, 'src/themes'),
    images: path.resolve(__dirname, 'src/assets'),
  },
  proxy: {
    "/web/*": {
      target: "http://service.xiaomafeiteng.com/",
      changeOrigin: true
    },
  }
};
