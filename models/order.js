
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')         

const connection = mongoose.createConnection("mongodb://localhost/CarDB")
autoIncrement.initialize(connection)

const orderSchema = new mongoose.Schema({
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '4320m' },
  },
  order_id:{
     type:Number
  },

  manufacturer:{
      type:String,
      required:true
  },

  model:{
    type:String,
    required:true
  },

  price:{
    type:Number,
    required:true
  }

})

orderSchema.plugin(autoIncrement.plugin,'order')
module.exports = mongoose.model('Order',orderSchema)