
import mongoose from 'mongoose';

const billSchema = mongoose.Schema({
    billNo: {
        type: Number,
        required: true,
        unique: true,
    },
    customer: { // Change the field name to 'customer'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true,
    },
    items: [
        {
            product: {
                type: String,
                required: true,
            },
            qty: {
                type: String, // Change this type to String to match the frontend
                required: true,
            },
            cost: {
                type: Number,
                required: true,
            },
        },
    ],
    tots: {
        type: Number,
        required: true,
    },
});

const Bill = mongoose.model('Bills', billSchema);
export default Bill;

// ... (previous code)
