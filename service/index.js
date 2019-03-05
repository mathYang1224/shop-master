const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')

const bodyParser = require('koa-bodyparser')
app.use(bodyParser());

const cors = require('koa2-cors')
app.use(cors())

//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
})()

const Router = require('koa-router')
let user = require('./appApi/user.js')
let router = new Router();

router.use('/user',user.routes())
app.use(router.routes())
app.use(router.allowedMethods())

let goods = require('./appApi/goods.js')
router.use('/goods',goods.routes())


app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})