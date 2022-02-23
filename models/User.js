const bcrypt  = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// const UserSchema = new mongoose.Schema({
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: { 
        type: String 
    },
});

// UserSchema.pre(
//     'save',
//     async function(next) {
//         const user = this;
//         const hash = await bcrypt.hash(this.password, 10);
//         this.password = hash;
//         next();
//     }
// );

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const User = mongoose.model('User', UserSchema);
module.exports.User = User;
