<template>
<div>
    <div class="navbar-div">
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
    </div>
    <div class="topimage-div">
        <img :src="goodsInfo.IMAGE1" width="100%"/>
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div>
        <van-tabs swipeable sticky>
            <van-tab title="商品详情">
                <div class="detail" v-html="goodsInfo.DETAIL">
                </div>
            </van-tab>
            <van-tab title="评价">
                正在制作中
            </van-tab>
        </van-tabs>
    </div>
    <!-- 底部 -->
    <van-goods-action id="bottom">
      <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
      <van-goods-action-mini-btn icon="cart" text="购物车" @click="toCart" />
      <van-goods-action-big-btn text="加入购物车" @click="addGoodsToCart" />
      <van-goods-action-big-btn text="立即购买" @click="onClickBigBtn" primary />
    </van-goods-action>
    <!-- <div class="goods-bottom">
        <div>
            <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
        </div>
        <div>
            <van-button size="large" type="danger">直接购买</van-button>
        </div>
    </div> -->
</div>
</template>
<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import { Toast } from 'vant'
    import {toMoney} from '@/filter/moneyFilter.js'

    export default {
        data() {
            return {
                goodsId: '',
                goodsInfo:{},   //商品详细数据
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
        created(){
            this.goodsId= this.$route.query.goodsId
            this.getInfo()
        },
        mounted(){
            window.addEventListener('scroll', this.onScroll)
        },
        beforeDestroy(){
            removeEventListener('scroll', this.onScroll)
        },
        methods: {
            onScroll(){
                let winHeight = document.documentElement.clientHeight
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if(scrollTop>winHeight/2){
                    document.getElementById('bottom').style.zIndex='4589981'
                }else{
                    document.getElementById('bottom').style.zIndex='-1564456'
                }
            },
            onClickLeft(){
                this.$router.go(-1)
            },
            onClickMiniBtn() {
              Toast('点击图标');
            },
            onClickBigBtn() {
              Toast('点击按钮');
            },
            //取商品详细信息
            getInfo() {
                axios({
                    url:url.getDetailGoodsInfo,
                    method:'post',
                    data:{
                        goodsId:this.goodsId= this.$route.query.goodsId ? this.$route.query.goodsId:this.$route.params.goodsId
                    }
                })
                .then(response=>{
                    if(response.data.code == 200 && response.data.message ){
                         this.goodsInfo = response.data.message 
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }
                    // console.log(this.goodsInfo)
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            //加入购物车
            addGoodsToCart(){
                axios({
                    url: url.addGoodsToCart,
                    method: 'post',
                    data:{
                        goodsId:this.goodsId,
                        userName:localStorage.userInfo
                    }
                })
                .then(response => {
                    // console.log(response)
                    //如果返回code为200，代表加入成功，我们给用户作Toast提示
                    if(response.data.code == 200){
                        Toast.success('加入成功')
                    }else{
                        console.log(response.data.message)
                        Toast.fail('请登录')
                        this.$router.push({name:'Login'})
                    }
                })
                .catch((error) => {   
                    Toast.fail('加入失败') 
                })
            },
            toCart(){
                if(localStorage.userInfo){
                    this.$router.push({name:'Cart'})
                }else{
                    Toast.fail('请登录')
                    this.$router.push({name:'Login'})
                }
                
            }
            //本地存储法
            // addGoodsToCart(){
            //     //取出购物车内的商品数据
            //     let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) :[]
            //     //判断购物车内是否已经有这个商品
            //     //如果没有返回undeifnd，如果有返回第一个查找到的数据
            //     let isHaveGoods=cartInfo.find(cart=>cart.goodsId==this.goodsId)
            //     console.log(isHaveGoods)
            //     if(!isHaveGoods){
            //         //没有商品直接添加到数组中
            //         //重新组成添加到购物车的信息
            //         let newGoodsInfo={
            //             goodsId:this.goodsInfo.ID,
            //             Name:this.goodsInfo.NAME,
            //             price:this.goodsInfo.PRESENT_PRICE,
            //             image:this.goodsInfo.IMAGE1,
            //             count:1
            //         }
            //         cartInfo.unshift(newGoodsInfo) //添加到购物车
            //         localStorage.cartInfo=JSON.stringify(cartInfo) //操作本地数据
            //         Toast.success('添加成功')
            //     }else{
            //         Toast.success('已有此商品')
            //     }
            //     this.$router.push({name:'Cart'})  //进行跳转
            // },
        },
    }
</script>
<style>
    .van-nav-bar{
        height: 2.3rem;
        line-height: 2.3rem;
    }
    .van-nav-bar__title{
        font-size: 0.8rem;
    }
    .van-nav-bar__left, .van-nav-bar__right{
        bottom: 50%;
        transform: translateY(50%);
        font-size: 0.7rem;
    }
    .van-nav-bar .van-icon {
        color: #f10215;
    }
    .van-nav-bar__text {
        color: #f10215;
    }
    .van-tabs--line .van-tabs__wrap{
        height: 2rem;
    }
    .van-tabs--line{
        padding-top: 2rem;
    }
    .van-tab{
        font-size: 0.7rem;
        line-height: 2rem;
    }
    .van-goods-action-mini-btn{
        height: 2.5rem;
        font-size: 0.8rem;
    }
    .van-goods-action-mini-btn__icon{
        font-size: 1rem;
    }
    .van-button--bottom-action{
        height: 2.5rem;
        line-height: 2.5rem !important;
        font-size: 0.8rem;
    }
    .detail{
        font-size:0px;
    }
    .goods-name{
        background-color: #fff;
    }
    .goods-price{
        background-color: #fff;
        text-align: center;
        margin-top: 5px;
    }
    .goods-bottom{
        position: fixed;
        bottom:0px;
        left:0px;
        background-color: #FFF;
        width:100%;
        height: 3.75rem;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
    }
    .goods-bottom > div{
        flex:1;
        padding:5px;
    }
    #bottom{
        z-index: -1;
    }
</style>