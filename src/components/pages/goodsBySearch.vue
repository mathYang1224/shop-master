<template>
    <div>
        <!-- 顶部栏 -->
        <div class="search">
          <van-row>
            <van-col span="4">
              <img :src="returnIcon" width="30%" @click="onClickLeft" class="location-icon" />
            </van-col>
            <van-col span="14">
              <input type="text" v-model="keyword" class="search-input1" placeholder="搜索想要的" />
            </van-col>
            <van-col span="5" id="btn">
              <van-button size="mini" @click="toSearch" class="btn">搜索</van-button>
            </van-col>
          </van-row>
        </div>
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <div id="cart-list">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                >
                    <div class="row" v-for="(item,index) in searchGoodsInfo" :key="index">
                        <div class="imgs" @click="goGoodsPage(item.ID)"><img :src="item.IMAGE1" width="100%" :onerror="    errorImg"/></div>
                        <div class="text" @click="goGoodsPage(item.ID)">
                            <div class="goods-name">{{item.NAME}}</div>
                            <div class="goods-price">
                                ￥{{item.PRESENT_PRICE | moneyFilter}}
                            </div>
                        </div>
                        <div class="buy" @click="addGoodsToCart(item.ID)">
                            <van-icon name="cart" size="1.5rem" color="#f10215"/>
                        </div>
                    </div>
                </van-list>
            </div>
        </van-pull-refresh>
        <to-top></to-top>
    </div>
</template>
<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {toMoney} from '@/filter/moneyFilter.js'
    import { Toast } from 'vant'
    import toTop from '@/components/component/toTop'
    export default {
        data(){
            return {
                returnIcon: require('@/assets/images/back.png'),//列表图,
                keyword:'',
                isRefresh:false,            //下拉加载
                searchGoodsInfo:[],
                errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"',                        //错误图片显示路径
                list:[],
                page:1,                     //商品列表的页数
                finished:false,             //下拉加载是否没有数据了
                loading:false,              //上拉加载使用,
                scrollTopOld:[],
                scrollTopNow:'',
            }
        },
        components:{toTop},
        created(){
            this.keyword = this.$route.query.keyword
            this.list = JSON.parse(localStorage.history)
            this.getSearchGoodsInfo()
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('cart-list').style.minHeight=winHeight-46 +'px'
            window.addEventListener('scroll', this.doScroll)
        },
        //离开时清除，不然影响别的页面
        beforeDestroy(){
          removeEventListener('scroll', this.doScroll)
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
        inject:['reload'],
        methods:{
            //加入购物车
            addGoodsToCart(goodsId){
                axios({
                    url: url.addGoodsToCart,
                    method: 'post',
                    data:{
                        goodsId:goodsId,
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
                        Toast.fail('加入失败')
                        this.openLoading=false
                    }
                })
                .catch((error) => {   
                    Toast.fail('加入失败') 
                    this.openLoading=false 
                })
            },
            //去商品详情页
            goGoodsPage(goodsId) {
              this.$router.push({name:'Goods',query:{goodsId:goodsId}})
            },
            doScroll(){
                let search = document.querySelector('.search')
                if(this.scrollTopOld.length>10){
                    this.scrollTopOld = []
                }
                this.scrollTopNow = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                this.scrollTopOld.push(this.scrollTopNow)
                if(this.scrollTopOld[10]-this.scrollTopOld[0]<0){
                    search.style.position = "fixed"
                }else if(this.scrollTopOld[10]-this.scrollTopOld[0]>0){
                    search.style.position = "absolute"
                }
                // console.log(this.scrollTopNow,this.scrollTopOld)
            },
            //返回键
            onClickLeft() {
              this.$router.push({name:'ShoppingMall'})
            },
            //下拉刷新
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished = false;
                    this.searchGoodsInfo=[];
                    this.page=1
                    this.getSearchGoodsInfo()
                }, 300);
            },
            //获取商品列表
            onLoad(){
                if(this.page!=1 && this.finished==false){
                    //设延迟模拟网速
                    setTimeout(()=>{
                        this.getSearchGoodsInfo()
                    },100)
                }
            },
            //去搜索
            toSearch(){
                //加入记录
                if(this.keyword){
                    if(this.list.length==0){
                        this.list.unshift(this.keyword)
                        localStorage.history=JSON.stringify(this.list)
                    }else{
                        for(var i=0;i<this.list.length;i++){
                            if(this.list[i]==this.keyword){
                                break
                            }else if(i==this.list.length-1){
                                this.list.unshift(this.keyword)
                                localStorage.history=JSON.stringify(this.list)
                                break
                            }
                        }
                    }
                    this.page = 1
                    this.searchGoodsInfo = []
                    this.finished = false
                    this.$router.replace({name:'goodsBySearch',query:{keyword:this.keyword}})
                    this.reload()
                }
            },
            //拿商品列表
            getSearchGoodsInfo() {
                axios({
                    url:url.getSearchGoodsInfo,
                    method:'post',
                    data:{
                        keyword:this.keyword,
                        page:this.page
                    }
                })
                .then(response=>{
                    if(response.data.code == 200 && response.data.message.length ){
                        this.page++
                        this.searchGoodsInfo = this.searchGoodsInfo.concat(response.data.message)
                        // console.log(this.searchGoodsInfo)
                    }else{
                        this.finished = true;
                        Toast.fail('没有更多了')
                    }
                    // console.log(this.finished)
                    this.loading=false;
                })
                .catch(error=>{
                    console.log(error)
                })
            },
        }
    }
</script>
<style scoped>
    .search{
        height: 2.6rem;
        width: 100%;
        line-height:2.6rem;
        z-index: 1000;
        background: #fff;
        border-bottom: 1px solid #eee;
        position: absolute;
        left: 0;
        top: 0;
    }
    .search-input1{
        width:100%;
        height: 1.6rem;
        border:0;
        background-color: #f5f5f5;
        color:#000;
        font-size:0.6rem;
        padding-left: 0.7rem;
        padding-right: -0.7rem;
        border-radius: 0.5rem; 
    }
    .btn{
        margin-left: 1rem;
        height: 1.7rem;
        background: #e93b3d;
        color: #fff;
        border-radius: 0.25rem;
        width:70%;
    }
    .location-icon{
        vertical-align: middle;
    }
    #cart-list{
        padding-top: 2.6rem;
        background-color: #fff;
    }
    .row{
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        padding:0.5rem;
        font-size:0.85rem;
        border-bottom:1px solid #E4E7ED;
    }
    .row .imgs{
        flex:6;
    }
    .text{
        flex:14;
        padding-left:0.5rem;
    }
    .goods-price{
        padding-top: 0.5rem;
        color: #f10215;
        text-align: center;
    }
    .buy{
        flex:4;
        text-align: right;
        padding-top: 1.5rem;
    }
    .buy div{
        margin: 6px 0;
    }
    .van-button--mini{
        font-size: 0.7rem;
    }
</style>