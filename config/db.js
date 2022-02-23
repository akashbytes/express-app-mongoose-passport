const mongoose = require('mongoose');
const { MONGO_URI } = process.env;
module.exports = () => {
    // below code wass used in older versions less than 5
    mongoose.Promise = global.Promise;
    // Connecting to the database
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database.', err);
        process.exit();
    });
}
