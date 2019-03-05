const Router = require ('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const md5 = require('md5')


router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
//注册
router.post('/register',async(ctx)=>{
    //取得Model
    const User = mongoose.model('User')
    let data = ctx.request.body
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User({userName:data.userName,password:md5(md5(data.password+'lz'))})
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(()=>{
        //成功返回code=200，并返回成功信息
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
         //失败返回code=500，并返回错误信息
        ctx.body={
            code:500,
            message:error
        }
    })
})
/*登录的实践 */
router.post('/login',async(ctx)=>{
    //得到前端传递过来的数据
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password
    //引入User的model
    const User = mongoose.model('User')
    await User.findOne({userName:userName,password:md5(md5(password+'lz'))}).exec().then(async(result)=>{
        console.log(result)
        if(result){
            // console.log(User)
            ctx.body={ code:200, message:'验证成功'} 
        }else{
            ctx.body={ code:400, message:'验证失败'}
        }
    }).catch(error=>{
        console.log(error)
        ctx.body={ code:500, message:error  }
    })
})
//加购物车
router.post('/cart',async(ctx)=>{
    let req = ctx.request.body
    const User = mongoose.model('User')
    await User.findOne({userName:req.userName}).exec().then(async(result)=>{
        if(result){
            result.goodsId.unshift(req.goodsId)
            result.save()
            // console.log(result)
            ctx.body={ code:200, message:'加入成功'} 
        }else{
            ctx.body={ code:400, message:'加入失败'}
        }
    }).catch(error=>{
        console.log(error)
        ctx.body={ code:500, message:error  }
    })
})
//取购物车
router.post('/getCart',async(ctx)=>{
    try{
        const User = mongoose.model('User')
        let result = await User.findOne(ctx.request.body).exec()
        ctx.body={code:200,message:result.goodsId}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
//拿用户信息
router.post('/getUserInfo',async(ctx)=>{
    try{
        const User = mongoose.model('User')
        let result = await User.findOne(ctx.request.body).exec()
        console.log(result)
        ctx.body={code:200,message:result.goodsId}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
//删购物车
router.post('/deleteOne',async(ctx)=>{
    try{
        console.log(ctx.request.body)
        const User = mongoose.model('User')
        let result = await User.updata({userName:ctx.request.body.userName},{$pull:{goodsId:ctx.request.body.goodsId}}).exec()
        result.save()
        ctx.body={code:200}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
module.exports=router;