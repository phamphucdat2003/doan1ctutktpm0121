//chay cai mongodb
const Baverage = require('../models/Baverage');
const { mongooseToObject } = require('../../util/mongoose');
//----------------------------------------------------------------
class baverageController {
    //[get] /baverages/:slug
    show(req, res, next) {
        Baverage.findOne({ slug: req.params.slug })
            .then((baverage) => {
                res.render('baverages/show', {
                    baverage: mongooseToObject(baverage),
                    title: baverage.name
                });
            })
            .catch(next);
    }
    //[get] /baverages/create
    create(req, res, next) {
        res.render('baverages/create',{title:'Create'});
    }
    //[post] /baverages/newbaverage
    newbaverage(req, res, next) {
        const baverage = new Baverage(req.body);
        baverage
            .save()
            //quay lại trang create
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[get] /baverages/{{this._id}}/edit
    edit(req, res, next) {
        Baverage.findById(req.params.id)
            .then((baverage) =>
                res.render('baverages/edit', {
                    baverage: mongooseToObject(baverage),
                    title:'Edit '+ baverage.name
                }),
            )
            .catch(next);
    }
    //[put] /baverages/:id
    update(req, res, next) {
        Baverage.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/baverages'))
            .catch(next);
    }

    //[delete] /baverages/:id
    delete(req, res, next) {
        Baverage.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[delete] /baverages/:id/force
    forceDelete(req, res, next) {
        Baverage.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[patch] /baverages/:id/restore
    restore(req, res, next) {
        Baverage.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[post] /baverages/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Baverage.delete({ _id: { $in: req.body.baverageIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Invalid action' });
                break;
        }
    }
}

module.exports = new baverageController();
