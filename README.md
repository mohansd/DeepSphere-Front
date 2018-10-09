# DeepSphere前端安装配置
## dev
1. 运行npm install
2. 修改/config/dev.env.js中BASE_API为正确IP
3. 运行npm run dev，打开http://localhost:9528/

## build
1. 运行npm install
2. 修改/config/prod.env.js中BASE_API为正确IP
3. 运行npm run build，生成dist静态资源文件夹
4. build完成后运行node app.js，打开http://localhost:3100/
