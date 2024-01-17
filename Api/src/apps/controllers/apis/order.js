const OrderModel = require("../../models/order");
const ProductModel=require("../../models/product")
const transporter=require("../../../libs/mail")
const _ = require("lodash");
// const mongoose = require("../../../common/database")();
const ejs=require("ejs");
const path=require("path");

exports.order = async (req, res) => {
    const body=req.body;
        // const items = body.items;
const totalPrice=body.items.reduce((total,item)=>total+item.price*item.qty,0);

//?
const idsPrd = body.items.map((item)=>item.prd_id);
console.log(idsPrd);
//1 mảng lưu trữ các ID
const products = await ProductModel.find({_id: {$in: idsPrd}});//lọc ra thông tin từ collection theo mảng idsPrd đã cho
console.log(products);
let items = [];
for(let product of products){//lấy dữ liệu từ back end
    const cart = _.find(body.items, {
        prd_id: product._id.toString()//product._id là object cần chuyển về dạng string
    });
    if(cart){
        cart.name = product.name;//lấy tên dữ liệu sản phâm
        items.push(cart);
    }
} 
console.log(items);


const html = await ejs.renderFile(path.join(req.app.get("views"), "mail.ejs"), {// req.app.get("views"):trả về đường dẫn tuyệt tối đến view
    //đường dẫn tuyệt đối đến mail.ejs
    fullName: body.fullName,
    phone: body.phone,
    address: body.address,
    totalPrice,
    items,
});


await transporter.sendMail({
    from: '"Vietpro Shop" <ama098540@gmail.com>',
    to: body.email,
    subject: "Xác nhận đơn hàng từ Vietpro Store",
    html,
});

//create order
    const order = {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        totalPrice,
        items: body.items,
    };

    
    await OrderModel(order).save();
    res.status(201).json({
        status:"success",
        message:"Created order successfully",
    })
}