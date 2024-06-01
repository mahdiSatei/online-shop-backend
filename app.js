const express = require("express")
const app = express()
const connectDB = require("./db/connect")
require("dotenv").config();


const auth_route = require('./routes/auth')
const user_route = require('./routes/user')
const product_router = require('./routes/product')
const cart_router = require('./routes/cart')
const order_router = require('./routes/order')

app.use(express.json());


app.use('/api/v1/auth', auth_route)
app.use('/api/v1/user', user_route)
app.use('/api/v1/product', product_router)
app.use('/api/v1/cart', cart_router)
app.use('/api/v1/order', order_router)


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
