let mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    age: Number
});

let User = mongoose.model("User", userSchema);
module.exports = User;