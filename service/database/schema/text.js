const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
const category3Schema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_NAME:{type:String},
    IMAGE:{type:String},
    TYPE:{type:Number},
    SORT:{type:Number},
    COMMENTS:[{
        qq:{type:String},
        ww:{type:String}
    }]
})
mongoose.model('Category3',category3Schema)