记账本

0. 会话控制使用的是session的方式
1. 注册账号功能，存进数据库前使用md5将密码加密
2. 登录账号功能
3. 登录成功时服务端生成session，并存放到数据库中
4. 登录成功后重定向到列表页
5. 列表页增删改查添加登录状态校验，未登录或session失效时，重定向到登录页
6. 退出登录功能
