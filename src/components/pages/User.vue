<template>
  <div>
    <van-nav-bar
      title="会员中心"
      left-text="返回"
      right-text="退出"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="user-card">
      <div class="image">
        <!-- <img src="@/assets/images/me.jpg" alt=""> -->
      </div>
      <div class="userName">
        <span class="name">用户名:{{userName}}</span>
        <span class="score">积分:189496</span>
      </div>
      <div class="userControl">
        <img src="@/assets/images/settings.png" alt=""> 账号管理
      </div>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" color="#ff9900" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" color="#ff9900" />
        待收货
      </van-col>
      <van-col span="6">
        <van-icon name="cash-back-record" color="#ff9900" />
        退/换货
      </van-col>
      <van-col span="6">
        <van-icon name="pending-orders" color="#f10215" />
        全部订单
      </van-col>
    </van-row>
    <van-cell-group>
      <van-cell icon="certificate" title="收藏商品" is-link />
      <van-cell icon="gold-coin" title="我的优惠券" is-link />
      <van-cell icon="gift" title="我收到的礼物" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'

export default {
  data(){
    return{
      errorImg:"http:\/\/images.baixingliangfan.cn\/firstCategoryPicture\/20180408\/20180408112010_4489.png",
      userName:''
    }
  },
  created(){
    // this.getUserInfo()
    this.userName=localStorage.userInfo
  },
  methods: {
    onClickLeft() {
      this.$router.go(-2)
    },
    onClickRight() {
      localStorage.clear()
      this.$router.push({name:'ShoppingMall'})
    },
    //取用户信息
    // getUserInfo(){
    //   axios({
    //     url:url.getUserInfo,
    //     method:'post',
    //     data:{
    //             userName:localStorage.userInfo
    //         }
    //   })
    //   .then(response=>{
    //     // console.log(response)
    //     if(response.data.code == 200 && response.data.message.length ){
    //         this.goodList=this.goodList.concat(response.data.message)
    //     }else{
            
    //     }
    //     this.loading=false;
    //     // console.log(this.finished)
    //   })
    //   .catch(error=>{
    //     console.log(error)
    //   })
    // }
  },
};
</script>

<style lang="less">
.user {
  &-poster {
    width: 100%;
    display: block;
  }
  &-group {
    margin-bottom: .3rem;
  }
  &-links {
    padding: 0.75rem 0;
    font-size: 0.6rem;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 1.6rem;
    }
  }
  &-card {
    width: 93%;
    height: 7rem;
    margin: 10px auto;
    border-radius: 7px;
    background: linear-gradient(90deg,#eb3c3c,#ff7459);
    background: -webkit-linear-gradient(left,#eb3c3c,#ff7459);
    box-shadow: 0 2px 5px rgba(255,98,98,.4);
    position: relative;
    overflow: hidden;
    .image{
      width: 3rem;
      height: 3rem;
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      overflow: hidden;
      background: #fff;
      img{
        width: 100%;
      }
    }
    .userName{
      width: 7rem;
      height: 3.5rem;
      position: absolute;
      left: 4rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.7rem;
      text-align: left;
      color: #fff;
      .name{
        margin-top: 0.5rem;
        /*width: 100%;*/
        height: 1rem;
        display: block;
      }
      .score{
        /*width: 100%;*/
        height: 1rem;
        display: block;
        margin-top: 0.25rem;
      }
    }
    .userControl{
      float: right;
      font-size: 0.6rem;
      margin-top: 0.75rem;
      margin-right: 0.25rem;
      img{
        width: 0.6rem;
      }
    }
  }
}
.van-nav-bar{
    height: 2.3rem;
}
.van-nav-bar__title{
    font-size: 0.9rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.van-nav-bar__left, .van-nav-bar__right{
    bottom: 50%;
    transform: translateY(50%);
    font-size: 0.7rem;
}
.van-nav-bar__text{
    color: #f10215;
}
.van-nav-bar .van-icon{
    color: #f10215;
}
.van-cell {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0.5rem 0.75rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.8rem;
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 0.7rem;
    overflow: hidden;
}
.van-cell__right-icon {
    color: #999;
    font-size: 0.6rem;
    line-height: 1.8rem;
    margin-left: 0.25rem;
}
.van-cell__left-icon {
    min-width: 1rem;
    font-size: 0.8rem;
    line-height: 1.8rem;
    margin-right: 0.25rem;
}
</style>