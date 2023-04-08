function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('info', 'You must log in to access that resource');
  res.render('login', { message: req.flash('info') });
}

module.exports = { ensureAuthenticated }; 
