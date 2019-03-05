<template>
    <div>
        <!-- 顶部栏 -->
        <div class="search1">
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
        <div class="history">
            <div class="top">
                <p>最近搜索</p>
                <span @click="deleteHistory">删除</span>
            </div>
            <div id="list">
                <van-row>
                    <van-col span="12" class="one" v-for="(item) in list">
                        <span @click="toSearch1(item)">{{item}}</span>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                returnIcon: require('@/assets/images/back.png'),//列表图,
                history: [],
                keyword: '',
                list:[],
            }
        },
        created(){
            if(localStorage.history){
                this.list = JSON.parse(localStorage.history) || []
                for(var i=0;i<localStorage.history.length;i++){
                    this.history[i] = localStorage.history[i]
                }
            }
        },
        methods:{
            //返回键
            onClickLeft() {
              this.$router.go(-1)
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
                    this.$router.replace({name:'goodsBySearch',query:{keyword:this.keyword}})
                }
            },
            toSearch1(item){
                if(item){
                    this.$router.replace({name:'goodsBySearch',query:{keyword:item}})
                }
            },
            //删除记录
            deleteHistory(){
                localStorage.history=''
                this.list=[]
            }
        }
    }
</script>
<style scoped>
    .search1{
        height: 2.6rem;
        line-height:2.6rem;
        z-index: 1000;
        background: #fff;
        border-bottom: 1px solid #eee;
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
    .history{
        padding: 1rem;
        height: 10rem;
    }
    .history .top{
        position: relative;
        height: 2rem;
        line-height: 2rem; 
        margin-bottom: 1rem;
    }
    .history .top p{
        float: left;
        margin: 0 0;
    }
    .history .top span{
        float: right;
    }
    .history #list{
        font-size: 1rem;
        text-align: left;
    }
    .one{
        padding: 1rem;
    }
    #list span{
        background: #f5f5f5;
        width: 120%;
        padding: 0.4rem;
        border-radius: 1rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .van-button--mini{
        font-size: 0.7rem;
    }
</style>