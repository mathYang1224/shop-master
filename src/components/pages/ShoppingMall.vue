<template>
<div id="content">
<!--搜索栏-->
<div class="search-bar">
  <van-row>
    <van-col span="5">
      <img :src="locationIcon" width="30%" @click="toCategoryByIndex(0)" class="location-icon" />
    </van-col>
    <van-col span="14">
      <input type="text" class="search-input" @click="toSearch" placeholder="搜索想要的" />
    </van-col>
    <van-col span="5" id="btn">
      <div @click="toLogin">登录</div>
    </van-col>
  </van-row>
</div>
<!--轮播图-->
<div class="swiper-area">
  <van-swipe :autoplay="3000">
    <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
      <img :src="banner.image" @click="goGoodsPage(banner.goodsId)" width="100%"/>
    </van-swipe-item>
  </van-swipe>
</div>
<!-- 分类 -->
<div class="type-bar">
  <div  v-for="(cate,index) in category" @click="toCategoryByIndex(index)" :key="index" >
    <img :src="cate.image" width="90%" />
    <span>{{cate.mallCategoryName}}</span> 
  </div>
</div>
<!--广告位-->
<div class="ad-banner">
    <img :src="adBanner.PICTURE_ADDRESS" width="100%">
</div>
<!--商品推荐-->
<div class="recommend-area">
    <div class="recommend-title">
        商品推荐
    </div>
    <div class="recommend-body">
      <!--商品区-->
      <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
              <div class="recommend-item" @click="goGoodsPage(item.goodsId)">
                  <img :src="item.image" width="80%" />
                  <div>{{item.goodsName}}</div>
                  <div>￥{{item.price | moneyFilter}} (￥{{item.price | moneyFilter}})</div>
              </div>
          </swiper-slide>
      </swiper>
    </div>
</div>
<!-- 三个楼层区 -->
<floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
<floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
<floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
<!--热卖区-->
<div class="hot-area">
  <div class="hot-title">热卖商品</div>
  <div class="hot-goods">
    <van-list>
      <van-row>
        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
          <!-- 给组件传值 -->
          <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
        </van-col>
      </van-row>
    </van-list>
  </div>
</div>
<to-top></to-top>
</div>
</template>

<script>
import axios from 'axios';
import 'swiper/dist/css/swiper.css' 
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '@/components/component/floorComponent'
import {toMoney} from '@/filter/moneyFilter.js'
import goodsInfo from '@/components/component/goodsInfoComponent'
import toTop from '@/components/component/toTop'
import url from '@/serviceAPI.config.js'

export default {
  data () {
    return {
      locationIcon: require('@/assets/images/Tabulation.png'),//列表图
      category:"",                  //分类
      adBanner:"",                  //广告
      bannerPicArray:{},            //轮播图地址
      recommendGoods:"",            //推荐商品
      swiperOption:{                //swiper属性
        slidesPerView:1             //一次只显示1个
      },
      floor1:[],                    //楼层123
      floor2:[],
      floor3:[],
      floorName:'',                 //楼层名
      hotGoods:[],                  //热卖商品
    }
  },
  inject:['changeTabBarActive'],
  filters:{
    //将钱都转为小数点后两位
    moneyFilter(money){
        return toMoney(money)
    }  
  },
  components:{swiper,swiperSlide,floorComponent,goodsInfo,toTop},
  created(){
    this.changeTabBarActive()
    //在easyMock上取数据
    //已改成数据库
    axios({
        url: url.getShoppingMallInfo,
        method: 'get',
    })
    .then(response => {
        // console.log(response)
        if(response.status==200){
            this.category = response.data.message[0].category;
            this.adBanner = response.data.message[0].advertesPicture;   //获得广告图片
            this.bannerPicArray = response.data.message[0].slides       //轮播图片
            this.recommendGoods = response.data.message[0].recommend    //推荐商品
            this.floor1 = response.data.message[0].floor1               //楼层1数据
            this.floor2 = response.data.message[0].floor2               //楼层2数据
            this.floor3 = response.data.message[0].floor3               //楼层3数据
            this.floorName = response.data.message[0].floorName
            this.hotGoods = response.data.message[0].hotGoods           //热卖商品
        }
    })
    .catch((error) => {
      console.log(error)    
    })
  },
  mounted () {
    //监听卷动事件
    window.addEventListener('scroll', this.searchBar)
  },
  //离开时清除，不然影响别的页面
  beforeDestroy(){
    removeEventListener('scroll', this.searchBar)
  },
  methods:{
    //去商品详情页
    goGoodsPage(goodsId) {
      this.$router.push({name:'Goods',query:{goodsId:goodsId}})
    },
    //去搜索页
    toSearch(){
      this.$router.push({name:'Search'})
    },
    //动态改变搜索框颜色
    searchBar(){
      let searchBar = document.querySelector('.search-bar')
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let opacity = 0
      opacity = scrollTop>0?0.85:0
      searchBar.style.background = 'rgba(241,2,21,' + opacity + ')'
    },
    //跳转到指定分类
    toCategoryByIndex(categoryIndex){
      this.$router.push({name:'CategoryList',params:{categoryIndex:categoryIndex,index:2}})
    },
    //去登陆
    toLogin(){
      localStorage.userInfo?this.$router.push({name:'User'}):this.$router.push({name:'Login'})
    }
  }
}
</script>

<style scoped>
  #content{
    background: #f5f5f5;
  }
  .search-bar{
    width: 100%;
    height: 2.2rem;
    line-height:2.2rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  .search-input{
    width:100%;
    height: 1.6rem;
    border:0;
    background-color: #fff;
    color:#000;
    font-size:0.6rem;
    padding-left: 0.7rem;
    border-radius: 0.5rem;
    /*margin-top: -0.5rem;*/
  }
  #btn{
    padding-left: 0.5rem;
    font-size: 0.8rem;
  }
  .location-icon{
    vertical-align: text-top;
  }
  .swiper-area{
      width:20rem;
      clear:both;
  }
  .type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
      flex: 1;
  }
  .type-bar div img{
    display: block;
  }
  .type-bar div span{
    font-size: 0.6rem;
  }
  /*推荐商品区*/
  .recommend-area{
      background-color: #fff;
      width: 90%;
      margin: 0.3rem auto;
      box-shadow: 0 0 2px #ccc;
  }
  .recommend-title{
      font-size:0.7rem;
      padding:.2rem;
      color:#f10215;
  }
  .recommend-item{
      font-size: 0.6rem;
      text-align: center;
  }
  .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
      width: 100%;
  }
  .hot-title{
      color: #f10215;
      font-size: 1rem;
  }
  .hot-goods{
      height: 130rem;
      overflow: hidden;
      background: #f5f5f5;
  }
  .van-col{
      padding: 0;
  }
</style>
