### Tree Shaking  基础设置
- 条件：必须为es6语法，CJS不支持
- 当项目打包时标记出 未使用的不到达代码 将其删除 当mode为"production"时 自动启用

### Scope Hoisting
- 现象： 打包后存在大量闭包
- 危害：1、大量函数闭包包裹代码，导致体积增大；2、运行代码时，创建的函数作用域变多，内存开销变大。
- 条件：必须为es6语法，CJS不支持
- 原理：将所有引用的模块代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
- 作用： 通过 scope hoisting 可以减少函数声明代码和内存开销 
- 使用：当mode为"production"时 自动启用

### 动态加载模版
- 插件：@babel/plugin-syntax-dynamic-import
— 用法：在.babelrc 文件中添加 "plugins": ["@babel/plugin-syntax-dynamic-import"] ；在用到的地方 import("./text.js").then（res=>{}）; 
