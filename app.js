const express = require('express')
const { json } = require('express/lib/response')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/OrdersDB'

const app =  express()

mongoose.connect(url,{useNewUrlParser:true})

const con = mongoose.connection

con.on('open',  () =>{
  console.log('connection opened')
})

app.listen(9000, () =>{
  console.log('Server started')
})
app.use(express.json())

const carRouter = require('./routes/orders')
app.use('/orders', carRouter)

