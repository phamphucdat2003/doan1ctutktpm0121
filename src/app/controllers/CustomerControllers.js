
const Customer = require('../models/Customer');
//----------------------------------------------------------------
class customerController {
    //[post] /customers/newcustomer
    newcustomer(req, res, next) {
        const customer = new Customer(req.body);
        customer
            .save()
            .then(() => res.redirect('/'))
            .catch(next);
    }
    delete(req, res, next) {
        Customer.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new customerController();
