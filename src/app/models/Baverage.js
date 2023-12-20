const mongoose = require('mongoose');
// dùng để tự động đặt slug
const slug = require('mongoose-slug-generator');
// sort delete
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Baverage = new Schema(
    {
        name: { type: String },
        priceSizeM: { type: Number },
        priceSizeL: { type: Number },
        describe: { type: String },
        imgbaverage: { type: String },
        // dùng để tự động đặt slug
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);
// add plugins
mongoose.plugin(slug, { separator: '_' });
Baverage.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});
module.exports = mongoose.model('Baverage', Baverage);
