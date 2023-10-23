const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
})

const ProductSchema = new Schema({
    name: {type: String, required: true},
    info: {type: String, required: true},
    code: {type: String, required: true},
    link: {type: String, required: true},
    description: {type: String, required: true},
    position: {type: Number, required: true},
    filename: {type: String, required: true},
})

const UserModel = model('User', UserSchema);
const ProductModel = model('Product', ProductSchema);
module.exports = {UserModel, ProductModel};