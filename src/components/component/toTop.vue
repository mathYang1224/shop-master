<template>
    <div>
        <div id="toTop" @click="toTop">
          <img :src="toTopIcon">
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                toTopIcon: require('@/assets/images/toTop.png'),//列表图
            }
        },
        mounted () {
            //监听卷动事件
            window.addEventListener('scroll', this.showToTop)
        },
        //离开时清除，不然影响别的页面
        beforeDestroy(){
          removeEventListener('scroll', this.showToTop)
        },
        methods:{
            //显示回到顶部按钮
            showToTop(){
              let scrollTop = document.documentElement.scrollTop
              let toTop = document.getElementById('toTop')
              toTop.style.display = scrollTop>400?'block':'none';
            },
            //去顶部
            toTop(){
              document.documentElement.scrollTop = 0
            },
        }
    }
</script>
<style>
    #toTop{
        position: fixed;
        right: 1.5rem;
        bottom: 5rem;
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 50%;
        background: rgba(204,204,204,.4);
        z-index: 10000;
        display: none;
      }
      #toTop img{
        width: 100%;
        height: 100%;
      }
</style>