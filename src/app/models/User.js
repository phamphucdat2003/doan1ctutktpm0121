const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        password: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
            unique: true,
        },
        admin: {
            type: Boolean,
        }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', userSchema);
