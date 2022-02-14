
const express = require('express')
const { modelNames } = require('mongoose')
const router = express.Router()
const Order = require('../models/order.js')
const cache = require('../routeCache')

router.get('/', cache(300) ,async(req,res) =>{
  console.time('Order.find()')
  try{
      const orders = await Order.find()
      res.json(orders)
      console.timeEnd("Order.find()")
  }
  catch(err){
    res.send('Could not retrieve orders')
  }
})

router.get('/:id', cache(300) ,async(req,res) =>{
  
  try{
      const orders = await Order.findById(req.params.id)
      res.json(orders)
    
  }
  catch(err){
    res.send('Could not retrieve order by id')
  }
})


router.post('/', async(req,res)=>{
  
  const order = new Order({
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      price: req.body.price
      
    })
    try{
      const orders_model= await order.save()
        res.json(orders_model._id)
    }
    catch(err){
      res.send('Could not create order');
    }
  })


  router.patch('/:id', async(req,res)=>{
  
       try{
        const order = await Order.findById(req.params.id);
        order.manufacturer = req.body.manufacturer;
        order.model = req.body.model;
        order.price = req.body.price;
        const response = await order.save()
        res.send(response)

      }
      catch(err){
        res.send('Could not update order');
      }

})

module.exports = router