const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const md5 = require('md5')
//创建我们的用户Schema
const userSchema = new Schema({
    UserId:ObjectId,
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()},
    goodsId:[{type:String}]
})
//每次存储数据时都要执行
// userSchema.pre('save', function(next){
//     //let user = this
//     // console.log(this)
//     this.password = md5(md5(this.password+'lz'))
//     next();
// })
//发布模型
mongoose.model('User',userSchema)