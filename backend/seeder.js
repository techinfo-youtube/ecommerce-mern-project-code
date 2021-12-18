const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const users = require("./data/users");
const User = require("./models/UserModel");
const Product = require("./models/ProductModel");
const Order = require("./models/OrderModel");
const products = require("./data/products");
const connectDb = require("./config/config");

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createUser = await User.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleData = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleData);
    console.log("Data Imported!!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const dataDestory = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destory".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  dataDestory();
} else {
  importData();
}
