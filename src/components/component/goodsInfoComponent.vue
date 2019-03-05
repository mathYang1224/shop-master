<template>
    <div class="goods-info" @click="goGoodsPage()">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-prices">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>
<script>
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        //接收传来的值
        props:['goodsImage','goodsName','goodsPrice','goodsId'],
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
        methods: {
            goGoodsPage() {
                this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
            }
        },
    }
</script>
<style scoped>
    .goods-info{
        width: 90%;
        margin: 0 auto;
        box-shadow: 0 0 2px #ccc;
        background: #fff;
        margin-top: 0.5rem;
        font-size: 0.6rem;
    }
    .goods-name{
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap; 
    }.goods-prices{
        text-align: center;
    }
</style>