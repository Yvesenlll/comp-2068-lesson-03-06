console.log("exported the module");
//const PageController = require('../controllers/PagesController');
const {home, about, contact} = require('../controllers/PagesController');

module.exports = router =>{
    router.get('/', home);

    router.get('/about', about)

    router.get('/contact', contact)
};