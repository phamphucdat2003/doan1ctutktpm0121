module.exports = {
    //để lấy một thằng trong mongodb
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map((mongoose) => mongoose.toObject());
    },
    //để lấy nhiều thằng trong mongodb
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
