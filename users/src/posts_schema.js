const mongoose = require('mongoose');
// pluck off schema from mongoose object
const { Schema } = mongoose;
// define posts schema subdocument
const postsSchema = new Schema({
    title: String
});

// export schema so we can import it in user.js
module.exports = postsSchema;