//chay cai mongodb
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { mutipleMongooseToObject,mongooseToObject } = require('../../util/mongoose');
//----------------------------------------------------------------
class ManageController {
    //[get] /manage
    viewUser(req, res, next) {
        let userQuery = User.find({});
        if (req.query.hasOwnProperty('_sort')) {
            userQuery = userQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        userQuery
            .then((users) =>
                res.render('manage/stored-User', {
                    users: mutipleMongooseToObject(users),
                    title:'Manage'
                }),
            )
            .catch(next);
    }
    //[get] /manage/{{this._id}}/edit-User
    editUser(req, res, next) {
        User.findById(req.params.id)
            .then((user) =>
                res.render('manage/edit-User', {
                    user: mongooseToObject(user),
                    title:'Edit ' + user.name
                }),
            )
            .catch(next);
    }
    //[put] /manage/:id
    async updateUser(req, res, next) {
        const { id } = req.params;
        const { name, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        User.updateOne({ _id: id }, { $set: { name, username, password: hashedPassword } })
          .then(() => res.redirect('/manage'))
          .catch(next);
      }
    //[delete] /manage/:id/force
    forceDeleteUser(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new ManageController();
