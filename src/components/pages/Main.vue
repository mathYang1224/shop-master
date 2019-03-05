<template>
    <div>
        <div class="main-div">
            <router-view></router-view>
        </div>
        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">分类</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                active: 0,          //标签栏状态值，默认首页
                nowPath:'',          //现在的路径
            }
        },
        created(){
            //页面创建时获取路径,改变标签栏状态
            this.changeTabBarActive()
        },
        provide(){
            return{
                changeTabBarActive:this.changeTabBarActive,
            }
        },
        mounted(){
            let icon = document.querySelectorAll('.van-icon')
            for(let item of icon){
                item.style.fontSize = 1+'rem'
            }
        },
        methods: {
            //根据状态值跳转相应页面
            changeTabbar(active) {
                // console.log(active)
                switch(active){
                    case 0:
                        this.$router.push({name:'ShoppingMall'})
                        break;
                    case 1:
                        this.$router.push({name:'CategoryList'})
                        break;
                    case 2:
                        if(localStorage.userInfo){
                           this.$router.push({name:'Cart'})
                        }
                        else{
                            this.$router.push({name:'Login',params:{active:active}})
                        }
                        break;
                    case 3:
                        if(localStorage.userInfo){
                           this.$router.push({name:'User'})
                        }
                        else{
                            this.$router.push({name:'Login'})
                        }
                        break;
                }
            },
            //动态获取路径,改变标签栏状态
            changeTabBarActive(){
                this.nowPath=this.$route.path
                // console.log(this.nowPath)
                if(this.nowPath=='/'){
                    this.active=0;
                }else if(this.nowPath=='/categoryList'){
                    this.active=1;
                }else if(this.nowPath=='/cart'){
                    this.active=2;
                }else if(this.nowPath=='/user'){
                    this.active=3;
                }
            },
        },
    }
</script>
<style scoped>
    .van-tabbar-item--active {
        color: #f10215;
    }
    .van-tabbar{
        box-shadow: 0 -2px 5px #ccc;
        height: 3.2rem;
    }
    .van-tabbar-item{
        font-size: 0.8rem;
    }
    .van-tabbar-item__icon .van-icon{
        font-size: 1rem;
    }
    .van-icon::before{
        font-size: 1rem;
    }
    .van-icon{
        font-size: 1rem;
    }
</style>