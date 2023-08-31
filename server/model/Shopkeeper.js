import mongoose from 'mongoose'
const ShopSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  }
})
const Shopkeeper = mongoose.model("Shopkeeper",ShopSchema);
export default Shopkeeper