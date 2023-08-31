import mongoose from "mongoose";

let CusSchema =mongoose.Schema
const customerSchema = new CusSchema({
  shopkeeperId: {
    type:mongoose.Schema.ObjectId,
    ref:"Shopkeeper"
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number:{
    type:Number,
    require:true
  }
});

const Customer = mongoose.model("Cus", customerSchema);
export default Customer
