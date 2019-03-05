<template>
    <div>
        <!-- 头部 -->
        <div class="navbar-div">
            <van-nav-bar
                title="分类列表"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
            >
              <van-icon name="search" slot="right" />
            </van-nav-bar>
        </div>
        <div>
            <van-row>
                <!-- 大类 -->
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li @click="clickCategory(index,category[index].ID)" :class="{categoryActive:categoryIndex==index}"  v-for="(item,index) in category" :key="index">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <!-- 小类 -->
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click='onClickCategorySub'>
                            <van-tab v-for="(item, index) in categorySub"  :key="index" :title="item.MALL_SUB_NAME">
                            </van-tab>
                        </van-tabs>
                    </div>
                    <!-- 具体商品 -->
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list
                                v-model="loading"
                                :finished="finished"
                                @load="onLoad"
                                >
                                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                                    <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg"/></div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div class="">￥{{item.ORI_PRICE | moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {toMoney} from '@/filter/moneyFilter.js'

    export default {
        data(){
            return {
                category:[],                //大类数据
                categoryIndex: '',          //大类选中
                active: 0,                  //小类选中
                categorySub:[],             //小类数据
                loading:false,              //上拉加载使用
                finished:false,             //下拉加载是否没有数据了
                isRefresh:false,            //下拉加载
                page:1,                     //商品列表的页数
                goodList:[],                //商品信息
                categorySubId:'',           //商品子分类ID
                errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"',                        //错误图片显示路径
                disable:false
            }
        },
        //接收父组件方法
        inject:['changeTabBarActive'],
        created(){
            //首页进来的分类进行跳转
            this.categoryIndex= this.$route.params.categoryIndex || 0
            this.getCategory();
            this.changeTabBarActive()
        },
        mounted(){
            let fontSize = parseFloat(document.getElementsByTagName('html')[0].style.fontSize);
            let winHeight = document.documentElement.clientHeight
            document.getElementById('leftNav').style.height=winHeight/fontSize-2.2-3.2 +'rem'
            document.getElementById('list-div').style.height=winHeight/fontSize-2.2-3.2-1.8 +'rem'
            let icon = document.querySelectorAll('.van-icon')
            for(let item of icon){
                item.style.fontSize = 1+'rem'
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
        methods:{
            //获取大类
            getCategory() {
                axios({
                    url:url.getCategoryList,
                    method:'get',
                })
                .then(response=>{
                    // console.log(response)
                    if(response.data.code == 200 && response.data.message ){
                        this.category=response.data.message
                        this.getCategorySubByCategoryId(this.category[this.categoryIndex].ID)
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }
                })
                .catch(error=>{
                    console.log(error)
                }) 
            },
            //点击大类的方法
            clickCategory(index,categoryId){
                this.categoryIndex=index            //用来判断选中效果
                this.page=1
                this.finished = false
                this.goodList=[]
                this.getCategorySubByCategoryId(categoryId)
            },
            //根据大类ID读取小类类别列表
            getCategorySubByCategoryId(categoryId){
                axios({
                    url:url.getCategorySubList,
                    method:'post',
                    data:{categoryId:categoryId}
                })
                .then(response=>{
                    if(response.data.code == 200 && response.data.message ){
                        this.categorySub=response.data.message
                        this.active = 0                         //默认放到第一个
                        this.onClickCategorySub(this.active)    //取当前商品
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }  
                })
                .catch(error=>{
                    console.log(error)
                }) 
            },
            //点击子分类加载商品列表
            onClickCategorySub(index){
                // this.disable = true
                this.categorySubId= this.categorySub[index].ID
                this.goodList=[]
                this.finished = false
                this.page=1
                this.onLoad()
            },
            //获取商品列表
            onLoad(){
                //设延迟模拟网速
                setTimeout(()=>{
                    this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
                    this.getGoodList()
                    // this.disable = false
                },300)
            },
            //获取商品列表
            getGoodList(){
                axios({
                    url:url.getGoodsListByCategorySubID,
                    method:'post',
                    data:{
                            categorySubId:this.categorySubId,
                            page:this.page
                        }
                })
                .then(response=>{
                    // console.log(response)
                    if(response.data.code == 200 && response.data.message.length ){
                        this.page++
                        this.goodList=this.goodList.concat(response.data.message)
                    }else{
                        this.finished = true;
                    }
                    this.loading=false;
                    // console.log(this.finished)
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            //下拉刷新
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished = false;
                    this.goodList=[];
                    this.page=1
                    this.onLoad()
                }, 300);
            },
            //跳转到商品详情页
            goGoodsInfo(id){
                this.$router.push({name:'Goods',query:{goodsId:id}})
            },
            //返回键
            onClickLeft() {
              this.$router.go(-1)
            },
            //搜索键
            onClickRight() {
              this.$router.push({name:'Search'})
            }
        }
    }
</script>
<style>
    .van-nav-bar{
        height: 2.3rem;
        line-height: 2.3rem;
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
    .navbar-div{
        border-bottom: 1px solid #ccc;
    }
    #leftNav{
        background: #f5f5f5;
    }
    #leftNav ul li {
        line-height: 3rem;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActive{
        background: #fff;
    }
    .van-tabs--line {
        padding-top: 34px;
    }
    .van-tabs__wrap--scrollable .van-tab {
        flex: 0 0 30%;
    }
    .list-item{
        text-align: center;
        /*line-height: 80px;*/
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
    }
    #list-div{
        overflow: scroll;
    }
    .tabCategorySub{
        height: 1.8rem;
    }
    .van-tabs--line .van-tabs__wrap {
        height: 1.8rem;
    }
    .van-tab {
        font-size: 0.6rem;
        line-height: 1.8rem;
    }
    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    .list-item-img{
        flex:1;
    }
    .list-item-text{
        flex:2;
    }
    .van-nav-bar .van-icon {
        color: #f10215;
    }
    .van-nav-bar__text {
        color: #f10215;
    }
</style>