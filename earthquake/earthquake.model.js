const mongoose = require('mongoose');

const earthquakeSchema = mongoose.Schema({
    "type": String,
    "properties": Object,
    "geometry": Object,
    "id": String
}, {
    timestamps: false
});

module.exports = mongoose.model('earthquake', earthquakeSchema);