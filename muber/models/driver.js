const mongoose = require('mongoose');
const { Schema } = mongoose;
// create driver schema
const DriversSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required.']
    },
    driving: {
        type: Boolean,
        // driver is not driving by default
        default: false
    }
});
// create model
const Driver = mongoose.model('driver', DriversSchema);
// export model
module.exports = Driver;
