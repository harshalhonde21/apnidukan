import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Customer from "./model/Customer.js";
import {
  customerLogin,
  customerSignup,
  getAllShopkeeper,
  getCustomer,
  login,
  signup,
  createBill,
} from "./controls/Controls.js";

const app = express();
app.use(express.json());
app.use(cors());

// const mongo = "mongodb://127.0.0.1:27017/ApniDukan";
const atlas =
  "mongodb+srv://harshalhonde17:harshal%40123@cluster0.b0mwyen.mongodb.net/Blogs?retryWrites=true&w=majority";
mongoose
  .connect(atlas)
  .then(() => app.listen(5500))
  .then(() => console.log("connected database at 5500"))
  .catch((error) => console.log(`${error}is error`));

const carouselItemSchema = new mongoose.Schema({
  schemeName: String,
  startDate: String,
  endDate: String,
});

const CarouselItem = mongoose.model("CarouselItem", carouselItemSchema);

const receiptItemSchema = new mongoose.Schema({
  phoneNumber: String,
  currentBalance: Number,
  payingAmount: Number,
  remainingAmount: Number,
});

const ReceiptItem = mongoose.model("ReceiptItem", receiptItemSchema);

app.get("/api/carousel", async (req, res) => {
  try {
    const carouselItems = await CarouselItem.find();
    res.json(carouselItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/api/carousel", async (req, res) => {
  try {
    const { schemeName, startDate, endDate } = req.body;
    const newCarouselItem = new CarouselItem({
      schemeName,
      startDate,
      endDate,
    });
    await newCarouselItem.save();
    res.status(201).json(newCarouselItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.delete("/api/carousel/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await CarouselItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// this my 1 control command for harshal db to fetch my cus from db and by id thank you

app.get("/getcus/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({ customer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/receipt", async (req, res) => {
  try {
    const { phoneNumber, currentBalance, payingAmount, remainingAmount } =
      req.body;
    const newReceiptItem = new ReceiptItem({
      phoneNumber,
      currentBalance,
      payingAmount,
      remainingAmount,
    });
    await newReceiptItem.save();
    res.status(201).json(newReceiptItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/api/receipt", async (req, res) => {
  try {
    const receiptItems = await ReceiptItem.find();
    res.status(200).json(receiptItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.delete("/api/receipt/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedReceiptItem = await ReceiptItem.findByIdAndDelete(id);

    if (!deletedReceiptItem) {
      return res.status(404).json({ error: "Receipt item not found" });
    }

    res.status(200).json({ message: "Receipt item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/", getAllShopkeeper);
app.post("/signup", signup);
app.post("/login", login);
app.post("/cussignup", customerSignup);
app.post("/cuslogin", customerLogin);
app.get("/getcus", getCustomer);
app.post("/api/bills/createBill", createBill);
