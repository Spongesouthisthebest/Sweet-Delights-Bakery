const express = require("express");
const app = express();
const port = 5545;
const mongoose = require("mongoose");
const stripe = require('stripe')('sk_test_51P4TSoSFPrVdKBVbmjp9LASNKS33nvJlYFF5lrve0DX2ld9rKePslNPDZZW21aH0MyFfeGpDv0WAuWRgMsMpeV9000LM8mZYSC');
const bcrypt = require("bcrypt")
app.use(express.static("public"));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/SweetDelightsBakery')

// User authentication

// Store

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1P6ZtwSFPrVdKBVbcOf7C44J',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});



app.get('/', (req, res) => {
    res.sendFile("templates/index.html", { root: __dirname });
});

app.get('/store', (req, res) => {
    res.sendFile("templates/store.html", { root: __dirname });
});

app.get('/success.html',(req,res)=>{
    res.sendFile("templates/success.html", { root: __dirname })
})

app.listen(4242, () => console.log('Running on port http://localhost:4242'));



