const {new: _new, create: create} = require('../controllers/UsersController');

module.exports = router => {
    // router.get('/new', controllerAction);    
    router.get('/register', _new);
    router.post('/users', create);
};