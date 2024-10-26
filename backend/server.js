//const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import Product from './models/product.js'

dotenv.config()



const app = express()

app.post("/products", async (req, resp)=>{
 const product = req.body // user will send this in body of post request
 if(!product.name || !product.price || product.image){
  return resp.status(400).json({succes:false, message: "Please provide all fields"})
 }

 const newProduct = new Product(product)

 try{
  await newProduct.save()
  resp.status(201).json({succes: true, data: newProduct})
 }catch(error){
  console.log(error);
  resp.status(500).json({succes: false, message: "Server error"})
  
 }
})


app.listen(5000, ()=>{
  connectDB()
  console.log("Server started at http://localhost:5000 ");
})

