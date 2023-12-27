//chay cai mongodb
const Baverage = require('../models/Baverage');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const Customer = require('../models/Customer');
const Message = require('../models/message');
//----------------------------------------------------------------
class MeController {
    //  /me/stored/baverages
    storedBaverage(req, res, next) {
        let baverageQuery = Baverage.find({});
        if (req.query.hasOwnProperty('_sort')) {
            baverageQuery = baverageQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([
            baverageQuery,
            Baverage.countDocumentsWithDeleted(),
            Baverage.countDocuments(),
        ])
            .then(([baverages, allCount, noDeletedCount]) =>
                res.render('me/stored-Baverages', {
                    allCount,
                    noDeletedCount,
                    baverages: mutipleMongooseToObject(baverages),
                    title:'Stored Baverage'
                }),
            )
            .catch(next);
        /////////thằng trên là gôm lại 2 cái ở dưới đây
        // Baverage.find({})
        //     .then((baverages) =>
        //         res.render('me/stored-Baverages', {
        //             baverages: mutipleMongooseToObject(baverages),
        //         }),
        //     )
        //     .catch(next);
        // Baverage.countDocumentsDeleted()
        //     .then((deletedCount) =>{
        //         console.log(deletedCount);
        //     })
        //     .catch(next);
    }
    //  /me/trash/baverages
    trashBaverage(req, res, next) {
        let baverageFwd = Baverage.findWithDeleted({ deleted: true });
        if (req.query.hasOwnProperty('_sort')) {
            baverageFwd = baverageFwd.sort({
                [req.query.column]: req.query.type,
            });
        }
        baverageFwd
            .then((baverages) =>
                res.render('me/trash-Baverages', {
                    baverages: mutipleMongooseToObject(baverages),
                    title:'Trash Baverage'
                }),
            )
            .catch(next);
    }
    finishedOrderdetails(req, res, next){
        let customerFwd = Customer.findWithDeleted({ deleted: true });
        if (req.query.hasOwnProperty('_sort')) {
            customerFwd = customerFwd.sort({
                [req.query.column]: req.query.type,
            });
        }
        customerFwd
            .then((customers) =>
                res.render('me/finished-Orderdetails', {
                    customers: mutipleMongooseToObject(customers),
                    title:'Finished Order Details'
                }),
            )
            .catch(next);
    }
    //  /me/stored/orderdetails
    storedOrderdetails(req, res, next) {
        let customerQuery = Customer.find({});
        if (req.query.hasOwnProperty('_sort')) {
            customerQuery = customerQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        customerQuery
        .then((customers) =>
            res.render('me/stored-Orderdetails', {
                customers: mutipleMongooseToObject(customers),
                title:'Stored Order Details'
            }),
        )
        .catch(next);
    }
    communication(req, res, next) {
        Message.find()
            .then((messages) => res.render('me/communication',{
                messages: mutipleMongooseToObject(messages),
            }))
            .catch(next);
    };
    async communicationpost(req, res, next) {
        const { name, content } = req.body;
        try {
            // Tạo một tin nhắn mới
            const message = new Message({
                name,
                content
            });
            await message.save();
            res.redirect('back');
        } catch (error) {
            console.error(error);
            res.redirect('back');
        }
    }
}

module.exports = new MeController();
