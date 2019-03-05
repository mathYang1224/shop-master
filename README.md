# 一个电商项目

基于**Vue+Vant+Node+Koa2+MongoDB** 实现

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run server
cd sevice
node / nodemon index.js


## 加载数据库流程
1. 先打开mongod
2. 进入sevice文件夹  node index.js
3. 导入数据
  http://localhost:3000/goods/insertAllCategory 导入大分类
  http://localhost:3000/goods/insertAllCategorySub 导入子分类
  http://localhost:3000/goods/insertAllGoodsInfo  导入商品
  再进数据库建立一个名为mains的collection
  我使用的Nosqlbooster将data_json下的main.json导入的
4. 根目录 ``npm run dev``，浏览器打开8080端口就可以了


```