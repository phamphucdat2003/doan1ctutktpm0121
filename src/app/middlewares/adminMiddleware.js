const adminMiddleware = (req, res, next) => {
  if (req.session.userId === '653e1d26ea4c8a2bcfbd1973') {
    // Người dùng đã đăng nhập, cho phép truy cập vào router tiếp theo
    next();
  } else {
    // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    res.redirect('back');
  }
};

module.exports = adminMiddleware;