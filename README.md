# 一个比较简单的webpack脚手架

## 可以转换ES6、支持scss、支持跨域调试、第三方库分离

```
# 1、 安装依赖
npm install or yarn install

# 2、 开发
npm run dev， 默认监听8080，注意：默认路径为：http://localhost:8080/index.html,如果出现"Cannot GET /xxx.html"，这很可能是没有index.html导致的。

# 3、 打包
npm run build，默认在主目录下"dist"文件夹。
```
# 增加页面：
    可直接在根目录下'config.js'中'pageConfig'中增加一项。
# 跨域调试
    具体配置项参考根目录下'config.js'中'proxy'选项
# 此分支没有配置框架
# 增加功能：
    1、第三方库分离
    2、配置优化
# 添加开发环境的VConsole
    方便移动端调试
# 添加自动增加css前缀
# 去除模块热替换
    如果想开启可在'config/webpack.dev.js'中开启
    (问题：开启模块热替换后无法检测html文件的更改，解决方法暂未找到)
# 优化配置
    现在都在根目录下config.js中直接修改
# 美化控制台输出信息