const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:{
        type: String,
        required : [true,"Name is required"],
        index : true
    },
    price:{
        type: mongoose.Types.Decimal128,
        required : true,
    },
    img:{
        type: String,
        required : true, 
    },
    description:{
        type: String,
        required : true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    isDeleted:{
        type :Boolean,
        default : false
    }
})

ProductSchema.set("toJSON",{
    transform: (doc, ret) => {
        ret.price = Number(doc.price.toString()).toFixed(2);
    }
})

const Product = mongoose.model("products", ProductSchema);
module.exports.Product = Product;