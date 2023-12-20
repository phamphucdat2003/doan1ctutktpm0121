//chay cai mongodb
const Baverage = require('../models/Baverage');
const { mutipleMongooseToObject } = require('../../util/mongoose');
//----------------------------------------------------------------
class SiteController {
    //[GET] /home
    index(req, res, next) {
        Baverage.find({})
            .then((baverages) => {
                res.render('site/home', {
                    baverages: mutipleMongooseToObject(baverages),
                    showPartial: true,
                    title:'Home'
                });
            })
            .catch(next);
    }

    //search
}

module.exports = new SiteController();
