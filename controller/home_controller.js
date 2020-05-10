const User = require('../models/user');

module.exports.home = function(req, res) {

    if (User) {
        res.render('home', {
            title: 'Home'
        });
    }
}