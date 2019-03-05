//easyMock地址，已改用数据库
// const BASEURL = "https://www.easy-mock.com/mock/5bb81c535df5622d84ac8770/smileVue/Mock/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:LOCALURL+'goods/Main',//首页数据
    registerUser:LOCALURL+'user/register',   //用户注册接口
    login:LOCALURL+'user/login',   //用户注册接口
    getDetailGoodsInfo : LOCALURL+'goods/getDetailGoodsInfo',  //获取商品详情
    getCategoryList:LOCALURL+'goods/getCategoryList',         //得到大类信息
    getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息
    addGoodsToCart:LOCALURL+'user/cart', //加入购物车
    getGoodsListInCart:LOCALURL+'user/getCart',//取购物车
    getDetailGoodsInfoInCart:LOCALURL+'goods/getDetailGoodsInfoInCart',
    getUserInfo:LOCALURL+'user/getUserInfo',
    getSearchGoodsInfo:LOCALURL+'goods/getSearchGoodsInfo',
    deleteOne:LOCALURL+'user/deleteOne',//删购物车
}
module.exports = URL