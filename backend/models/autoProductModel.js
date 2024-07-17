const { default: mongoose } = require("mongoose");

const autoProductSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    phoneNumber: String,
},{
    timestamps : true
})

const autoProductModel = mongoose.model("auto product", autoProductSchema)

module.exports = autoProductModel