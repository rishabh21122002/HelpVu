module.exports = {
    ensureAuthenticated2 : function(req,res,next) {
    if(req.isAuthenticated()) {
    return next();
    }
    req.flash('error_msg' , 'please login to view this resource');
    res.redirect('/hospital/login');
    }
    }