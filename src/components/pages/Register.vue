<template>
    <div>
       <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />
        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
                :error-message='usernameErrorMsg'
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message='passwordErrorMsg'
            />
            <div class="register-button">
                <van-button type="primary" @click="registerAction" :loading="openLoading" size="large">立即注册</van-button>
            </div>
       </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import { Toast } from 'vant'
    export default {
        data() {
            return {
                username: '',
                password: '',
                openLoading: false, //是否开启用户的Loading
                usernameErrorMsg:'',   //当用户名出现错误的时候
                passwordErrorMsg:'',   //当密码出现错误的时候
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)   
            },
            registerAction(){
                if(this.checkForm()){
                    this.axiosRegisterUser()
                }
            },
            checkForm(){
                let isOk= true
                if(this.username.length<2){
                    this.usernameErrorMsg="用户名不能小于2位"
                    isOk= false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg="密码不能少于6位"
                    isOk= false
                }else{
                    this.passwordErrorMsg=''
                }
                return isOk
            },
            //*********axios注册用户方法********
            axiosRegisterUser(){
                this.openLoading=true
                console.log(this.openLoading)
                axios({
                    url: url.registerUser,
                    method: 'post',
                    data:{
                        userName:this.username,
                        password:this.password 
                    }
                })
                .then(response => {
                    console.log(response)
                    //如果返回code为200，代表注册成功，我们给用户作Toast提示
                    if(response.data.code == 200){
                        Toast.success('注册成功')
                        this.$router.push({name:'Login',params:{password:this.password,username:this.username}})
                    }else{
                        console.log(response.data.message)
                        Toast.fail('注册失败')
                        this.openLoading=false
                    }
                })
                .catch((error) => {   
                    Toast.fail('注册失败') 
                    this.openLoading=false 
                })
            },
            

        },
    }
</script>
<style scoped>
    .van-nav-bar{
        height: 2.3rem;
        line-height: 2.3rem;
    }
    .van-nav-bar__title {
        font-size: 0.9rem;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .van-nav-bar__left, .van-nav-bar__right {
        bottom: 0;
        font-size: 0.7rem;
        position: absolute;
    }
    .van-nav-bar__text{
        color: #f10215;
    }
    .van-nav-bar .van-icon{
        color: #f10215;
    }
    .van-cell--required::before{
        font-size: 0.7rem;
    }
    .van-cell {
        padding: 0.5rem 0.75rem;
        line-height: 1.2rem;
        font-size: 0.7rem;
    }
    .van-cell__value{
        margin-left: 0.5rem;
    }
    .van-field__icon .van-icon{
        font-size: 0.6rem;
    }
    .register-panel{
        width:96%;
        border-radius: 0.25rem;
        margin:0.25rem auto;
        padding-bottom:2.5rem;
    }
    .van-col{
        padding: 0.25rem;
    }
    .van-button--large{
        height: 2rem;
        line-height: 2rem;
    }
    .van-button{
        font-size: 0.8rem;
    }
</style>