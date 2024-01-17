const mongoose = require("../../common/database")();
const productSchema = new mongoose.Schema({
    cat_id:{
        type: mongoose.Types.ObjectId,
        ref: "Categories",
        required: true
    },
    name:{
        type: String,
        text : true,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    warranty:{
        type: String,
        required: true
    },
    accessories:{
        type: String,
        required: true
    },
    promotion:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    featured:{
        type: Boolean,
        default: false,
    },
    is_stock:{
        type: Boolean,
        default: true,
    }
},{timestamps : true});

const ProductModel = mongoose.model("Products",productSchema,"products");

module.exports = ProductModel;