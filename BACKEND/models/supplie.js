const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplieSchema = new Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    idNo : {
        type : String,
        required : true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    }
})

const Supplie = mongoose.model("Supplie",supplieSchema);    //const is a keyword in JavaScript used to declare variables that cannot be reassigned.    

module.exports = Supplie; // allows you to export modules from one file to be used in another file