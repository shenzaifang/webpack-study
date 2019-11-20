### 利用npm 发布包
- 发布包之前你首先要有一个npm的账号
- 第一次发布包

在终端输入npm adduser，提示输入账号，密码和邮箱，然后将提示创建成功

注意：登陆的时候一定要确定npm源为：https://registry.npmjs.org/

- 非第一次发布包：

在终端输入npm login，然后输入你创建的账号和密码，和邮箱，登陆
【注意】npm adduser成功的时候默认你已经登陆了，所以不需要再接着npm login.

- 【注意点3】你的项目里有部分私密的代码不想发布到npm上？
  将它写入.gitignore 或.npmignore中，上传就会被忽略了
  
- npm unpublish 只能取消发布 72小时内的包

-  测试 npm pack 在本地生成 large-number-add-1.0.0.tgz 文件

在其他项目引入 npm i 路径/large-number-add-1.0.0.tgz -D
