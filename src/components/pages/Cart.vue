<template>
    <div id="cartBody">
        <div class="navbar-div">
            <van-nav-bar   
                title="购物车" 
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            /> 
        </div>
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <!--显示购物车中的商品-->
            <div class="cart-list">
                <div class="row" v-for="(item,index) in cartInfo" :key="index">
                    <van-swipe-cell :right-width="swipeWidth">
                        <div class="img" @click="goGoods(item.ID)"><img :src="item.IMAGE1" width="100%" /></div>
                        <div class="text">
                            <div class="goods-name"  @click="goGoods(item.ID)">{{item.NAME}}</div>
                            <div class="control">
                                <van-stepper v-model="count[index]" />
                            </div>
                        </div>
                        <div class="goods-prices1">
                            <div>
                                ￥{{item.PRESENT_PRICE | moneyFilter}}
                            </div>
                            <div>
                                x {{count[index]}}
                            </div>
                            <div class="allPrice">
                                ￥{{item.PRESENT_PRICE*count[index] | moneyFilter}}
                            </div>
                        </div>
                        <span slot="right" class="delete" @click="deleteOne(item.ID)">删除</span>
                    </van-swipe-cell>
                </div>
            </div>
        </van-pull-refresh>
        <!--清空购物车-->
        <!-- <div class="card-title">
            <van-button size="small" type="danger" @click="deleteCart" plain>清空购物车</van-button>
        </div> -->
        <van-submit-bar
          :price="totalMoney*100"
          :disabled="!checkedGoods.length"
          :button-text="submitBarText"
          @submit="onSubmit"
        />
    </div>
</template>
<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import { SubmitBar, Toast } from 'vant';
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        components: {
            [SubmitBar.name]: SubmitBar,
        },
        data() {
            return {
                cartInfo: [],     //购物车内的商品
                isEmpty : false , //购物车是否为空，不为空则显示true，为空显示false
                checkedGoods: ['1', '2', '3'],
                isRefresh:false,            //下拉加载
                number:0,          //购物车总数
                goodsId:'',
                count:[],
                newarr2:[],
                newArr:[],
                swipeWidth:0,
            }
        },
        mounted(){
            let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
            this.swipeWidth = htmlWidth/5
        },
        created(){
            this.getCartInfo()
            this.changeTabBarActive()
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
        computed:{
            submitBarText() {
              const counts = this.number
              return '结算' + (counts ? `(${counts})` : '')
            },
            totalMoney(){
                let allMoney = 0
                this.number = 0
                this.cartInfo.forEach((item,index) => {
                   allMoney += item.PRESENT_PRICE*this.count[index]
                   this.number += this.count[index]
                });
                localStorage.cartInfo=JSON.stringify(this.cartInfo)
                return allMoney
            }
        },
        inject:['changeTabBarActive'],
        methods: {
            goGoods(id){
                this.$router.push({name:'Goods',query:{goodsId:id}})
            },
            //得到购物车的商品
            getCartInfo() {
                axios({
                    url:url.getGoodsListInCart,
                    method:'post',
                    data:{
                        userName:localStorage.userInfo
                    }
                })
                .then(response=>{
                    // console.log(response)
                    let goodsId = this.goodsId
                    goodsId = response.data.message
                    // console.log(goodsId)
                    this.cartInfo = []
                    this.newArr = [];
                    //获得不重复的元素
                    this.newArr=[...new Set(goodsId)];  
                    // console.log(this.newArr)
                    //每个元素重复的次数
                    this.newarr2 = new Array(this.newArr.length);
                    for(var t = 0; t < this.newarr2.length; t++) {
                        this.newarr2[t] = 0;
                    }
                    for(var p = 0; p < this.newArr.length; p++) {
                        for(var j = 0; j < goodsId.length; j++) {
                            if(this.newArr[p] == goodsId[j]) {
                                this.newarr2[p]++;
                            }
                        }   
                    }
                    this.getInfo(this.newArr)
                    this.count = this.newarr2
                    // console.log(this.count)
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            async xxx(p){
                await this.getInfo(this.newArr[p])
            },
            getInfo(goodsId) {
                axios({
                    url:url.getDetailGoodsInfoInCart,
                    method:'post',
                    data:{
                        goodsId:goodsId
                    }
                })
                .then(response=>{
                    if(response.data.code == 200 && response.data.message ){
                         this.cartInfo = response.data.message 
                         // console.log(this.cartInfo)
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            deleteOne(goodsId){
                axios({
                    url:url.deleteOne,
                    method:'post',
                    data:{
                        goodsId:goodsId,
                        userName:localStorage.userInfo
                    }
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code == 200){
                        console.log(1)
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            //清空购物车的商品
            deleteCart(){
                // localStorage.removeItem('cartInfo')
                this.cartInfo=[]
            },
            onSubmit() {
              Toast('点击结算');
            },
            //返回键
            onClickLeft() {
              this.$router.go(-1)
            },
            //下拉刷新
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    this.getCartInfo()
                }, 300);
            },
        },
    }
</script>
<style>
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
    #cartBody{
        padding-bottom: 4.5rem;
    }
    .van-swipe-cell{
        width: 100%;
    }
    .card-title{
        height: 2rem;
        line-height:2rem;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding:5px;
        text-align: right;
    }
    .cart-list{
        background-color: #fff;
    }
    .row{
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        padding:0.5rem;
        font-size:0.85rem;
        border-bottom:1px solid #E4E7ED;
        height: 6rem;
    }
    .row .img img{
        float: left;
        width: 30%;
    }
    .text{
        float: left;
        width: 50%;
        margin-top: 0.5rem;
    }
    .control{
        margin-top: 0.5rem;
    }
    .van-stepper__minus, .van-stepper__plus{
        width: 2rem;
        height: 1.5rem;
    }
    .van-stepper__input{
        width: 1.65rem;
        height: 1.4rem;
        font-size: 0.7rem;
    }
    .goods-prices1{
        width: 20%;
        float: right;
        text-align: right;
        margin-top: 0.4rem;
    }
    .goods-prices1 div{
        margin: 0.3rem 0;
    }
    .allPrice{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .totalMoney{
        text-align: right;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding: 5px;
    }
    .van-submit-bar {
        left: 0;
        bottom: 3.2rem;
        width: 100%;
        z-index: 100;
        position: fixed;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .van-swipe-cell__right{
        color: #fff;
        background: #f44;
        width: 20%;
        height: 6rem;
        line-height: 6rem;
    }
    .van-submit-bar__bar{
        height: 2rem;
        font-size: 0.7rem;
    }
    .van-submit-bar .van-button{
        font-size: 0.7rem;
        width: 5rem;
    }
    .van-button{
        line-height: 2rem;
    }
</style>    