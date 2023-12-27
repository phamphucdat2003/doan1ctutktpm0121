const meRouter = require('./me');
const baveragesRouter = require('./Baverages');
const siteRouter = require('./site');
const customersRouter = require('./Customers');
const authRouter = require('./auth');
const manageRouter = require('./Manage');
const authMiddleware = require('../app/middlewares/authMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const godcatMiddleware = require('../app/middlewares/godcatMiddleware');
const randomkey = require('../app/middlewares/randomkeyMiddleware');


function route(app) {
    app.use('/auth',authRouter);
    app.use('/manage',adminMiddleware,manageRouter);
    app.use('/customers',customersRouter);
    app.use('/me',authMiddleware,meRouter);
    app.use('/baverages',baveragesRouter);
    app.use('/',randomkey,godcatMiddleware,siteRouter);
}

module.exports = route;
