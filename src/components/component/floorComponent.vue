<template>
    <div id="box">
        <div class="floor-title"> {{floorTitle}} </div>
        <!--floor one area-->
        <div class="floor">
            <div class="floor-anomaly">
                <div class="floor-one" @click="goGoodsPage(floorData0.goodsId)"><img :src="floorData0.image" width="100%" /></div>
                <div>
                    <div class="floor-two" @click="goGoodsPage(floorData1.goodsId)"><img :src="floorData1.image" width="100%" /></div>
                    <div @click="goGoodsPage(floorData2.goodsId)"><img :src="floorData2.image" width="100%" /></div>
                </div>
            </div>
            <div class="floor-rule">
                <!-- 从3开始取，一共有4张 -->
                <div v-for="(item ,index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" width="100%" @click="goGoodsPage(item.goodsId)"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['floorData','floorTitle'],
        data() {
            return {
                floorData0:{},
                floorData1:{},
                floorData2:{}
            }
        },
        created(){
            //这里写得不到数据，应为数据是延迟返回的
        },
        watch:{
            floorData:function(){
                this.floorData0=this.floorData[0]
                this.floorData1=this.floorData[1]
                this.floorData2=this.floorData[2]
            }
        },
        methods:{
          goGoodsPage(goodsId) {
            this.$router.push({name:'Goods',query:{goodsId:goodsId}})
          }
        }
    }
</script>
<style scoped>
  #box{
    box-shadow: 0 0 2px #ccc;
    width: 90%;
    margin: 0.5rem auto;
  }
  .floor-title{
    background: #fff;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    padding: 0.25rem 0 0.25rem 1rem;
    text-align: left;
    position: relative;
  }
  .floor-title::before{
    content: '';
    width: 0.2rem;
    height: 0.8rem;
    background: #f10215;
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
}
  .floor-anomaly{
      display: flex;
      flex-direction:row;
      background-color: #fff;
      border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
     width:9rem;
     box-sizing: border-box;
     -webkit-box-sizing: border-box;
  }
  .floor-one{
      border-right:1px solid #ddd;
  }
  .floor-two{
      border-bottom:1px solid #ddd;
  }
  .floor-rule{
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      background-color: #fff;
  }
  .floor-rule div{
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width:9rem;
      border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
      border-right: 1px solid #ddd;
  }
</style>