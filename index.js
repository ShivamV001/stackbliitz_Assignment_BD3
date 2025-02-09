const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const app = express();
const port = 3010;
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

function addNewItems(cartItems,productId,name,price,quantity){
 cartItems.push({productId: productId, name: name, price: price, quantity: quantity});
  return cartItems;
}
app.get('/cart/add',(req, res) => {
  let productId =parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addNewItems(cart,productId,name,price,quantity);
  cart = result;
  res.json({cartItems: cart});
});

function editQuantity(cartItems,productId,quantity){
  for(let i=0; i<cartItems.length; i++){
    if(cartItems[i].productId == productId){
      cartItems[i].quantity = quantity;
    }
  }
  return cartItems;
}
app.get('/cart/edit',(req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editQuantity(cart,productId,quantity);
  cart = result;
  res.json({cartItems: cart});
});

function deleteItem(cartItem,productId){
 return cartItem.productId == productId;
}
app.get('/cart/delete',(req,res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter(cartItem => deleteItem(cartItem,productId));
  cart = result;
  res.json({cartItems: cart});
});

function viewCart(cartItems){
  return cartItems;
}
app.get('/cart',(req,res) => {
  let result = viewCart(cart);
  res.json({cartItems: result});
});

function calculateQuantity(cartItems){
  let total = 0;
  for(let i=0; i<cartItems.length; i++){
    total = total + cartItems[i].quantity;
  }
  return total;
}
app.get('/cart/total-quantity',(req,res) => {
  let result = calculateQuantity(cart);
  cart = result;
  res.json({"total items in cart": result});
});

function calculatePrice(cartItems){
  let sum = 0;
  for(let i=0; i<cartItems.length; i++){
    sum = sum + (cartItems[i].price * cartItems[i].quantity);
  }
  return sum;
}
app.get('/cart/total-price',(req, res) => {
  let result = calculatePrice(cart);
  res.json({"total price": result});
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
