// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Godcat = require('../models/Godcat');



class authController {
  //[get] /auth/login
  viewlogin (req, res) {
    const errorPassword = req.session.errorPassword;
    const errorName = req.session.errorName;
    delete req.session.errorPassword;
    delete req.session.errorName;

    if (req.session.userId) {
      res.redirect('/')
    }else {
      res.render('auth/login',{ errorN: errorName , errorP: errorPassword,title:'Login'});
    }
  };
  //[get] /auth/register
  viewregister (req, res) {
      if (req.session.userId) {
        res.render('auth/Onboarding-User',{title:'Register'});
      }else {
        res.redirect('/')
      }
    };
  //[post] /auth/register
    async register (req, res) {
    const { name, username, password } = req.body;
    try {
      let userAlert = req.session.userAlert;
      let userStatus = req.session.userStatus;
      // Kiểm tra xem người dùng đã tồn tại hay chưa
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        let userAlert = 'Tài khoản đã bị trùng';
        let userStatus = 'warning ';
        return res.render('auth/register',{userAlert:userAlert,userStatus:userStatus,title:'register'});
      } else {
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Tạo người dùng mới
        const newUser = new User({ name, username, password: hashedPassword });
        await newUser.save();
        let userAlert = 'Tài khoản đã được tạo';
        let userStatus = 'success';
        res.render('auth/register',{userAlert:userAlert,userStatus:userStatus,title:'register'});
      }
    } catch (error) {
      res.render('error/404',{title:'Error'})
    }
  };
  //[post] /auth/login
  async login (req, res) {
    const { username, password } = req.body;
    try {
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findOne({ username });
      const godcat = await Godcat.findOne();

      
      if (!user) {
        req.session.errorName = 'Sai tài khoản. Vui lòng thử lại.';
        return res.redirect('/auth/login');
      }
  
      // So sánh mật khẩu
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        req.session.errorPassword = 'Sai mật khẩu. Vui lòng thử lại.';
        return res.redirect('/auth/login');
      }
  
      // Lưu thông tin người dùng vào phiên làm việc
      req.session.userId = user._id;
      req.session.name = user.name;
      req.session.godcat = godcat.key;
      req.session.admin = user.admin;
      res.redirect('/');
    } catch (error) {
      res.json({
        err : error.message
      });
    }
  };
  //[post] /auth/registergodcat
  async registergodcat (req, res) {
  };
  async godcat (req, res) {
    const key = req.body.key;
    try {
      const godcat = await Godcat.findOne();
      // So sánh mật khẩu
      const isKeyCorrect = (key === godcat.key);
      if (!isKeyCorrect) {
        req.session.godcaterr = true;
        return res.redirect('/');
      }
      // Lưu thông tin người dùng vào phiên làm việc
      delete req.session.godcaterr;
      req.session.godcat = true;
      res.redirect('/');
    } catch (error) {
      res.json({
        err : error.message
      });
    }
  };
  //[post] /auth/logout
  logout = (req, res) => {
    // Xóa thông tin người dùng khỏi phiên làm việc
    req.session.destroy();
    res.redirect('/');
  };
}
module.exports = new authController();