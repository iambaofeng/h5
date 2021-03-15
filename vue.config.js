const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: (config) => {
    config.devtool = "source-map"; //关联vscode编辑器调试
  },
  chainWebpack: (config) => {
    //设置目录映射
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set("@views", resolve("src/views")); //src路径映射为@，以后@/assets/...
    //开启gzip压缩,最新版本有坑，这里安装的是6.1.1版本
    if (process.env.NODE_ENV === "production") {
      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          test: productionGzipExtensions, //匹配文件名，那些文件要被压缩,正则表达式
          threshold: 10240, //只处理比这个值大的资源。按字节计算
          deleteOriginalAssets: false,
        })
      );
    }
  },
  publicPath: "./", //默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。这个值也可以被设置为空字符串('') 或是相对路径('./') ，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。
  outputDir: "dist", //当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  assetsDir: "", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath: "app.html", //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  filenameHashing: true, //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
  lintOnSave: false, //设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  runtimeCompiler: false, //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  productionSourceMap: false, //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  //css相关配置
  css: {
    extract: process.env.NODE_ENV === "production", // 是否开启css分离 在开发环境开启会导致热更新异常
    sourceMap: true, // 在浏览器审查时是否显示当前css文件路径 开发环境建议开启 不影响热更新

    loaderOptions: {
      postcss: {
        plugins: [
          // require("postcss-pxtorem")({
          //   //把px单位转换算成rem单位
          //   rootValue: 37.5,
          //   // 换算的基数(将宽度为750px的设计稿分成10等份，每份也就是75px，也就是1rem=75px)
          //   propList: ["*"],
          //   // selectorBlackList: ["van-", "weui"],
          // }),
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"],
          }),
        ],
      },
    },
  },
  devServer: {
    open: false, //自动打开浏览器进入项目
    // 端口
    port: 9077,
    // https
    https: false,
    // 热更新(必开)
    hotOnly: true,
    // 使用代理
    proxy: {
      "/api": {
        // 目标代理服务器地址
        target: "http://112.126.58.183:5056/",
        // 开启代理，本地创建一个虚拟服务器 允许跨域
        changeOrigin: true,
      },
    },
  },
};
