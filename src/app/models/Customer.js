const mongoose = require('mongoose');
// sort delete
const mongooseDelete = require('mongoose-delete');
// auto add id tuan tu
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const Customer = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        baverage: { type: String },
        numberoftables: { type: Number },
        total: { type: Number },
        note: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);
// add plugins
Customer.plugin(AutoIncrement);
Customer.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});
module.exports = mongoose.model('Customer', Customer);
