import mongoose from "mongoose";


const Product = new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    additionalImageUrls:[String],
    brandName:String,
    imageUrl:String,
    name:String,
    price:{
        currency:String,
        current:{
            text:{
                type:String
            }
        },
        previous:{
       text:String
        }
    }
    ,
    url:String,
    category:String
})

const Products= mongoose.model('Products',Product)
export default Products