const {new: _new,index, show, create, edit, update, delete:_delete }= require('../controllers/BlogsController');

function auth (req, res, next, message, redirectPath){
    if(!req.isAuthenticated()){
        req.flash('danger', message);
        return res.redirect(redirectPath);
    }
next();
}
module.exports = router => {
    router.get('/blogs', index); // this is public
    router.get('/blogs/new', auth, _new);   // this is authenticated
    router.post('/blogs', auth, create);// this is authenticated
    router.post('/blogs/update', auth,  update);// this is authenticated
    router.post('/blogs/delete', auth, _delete);// this is authenticated
    router.get('/blogs/:id/edit', auth, edit);// this is authenticated
    router.get('/blogs/:id', show);// this is public 
}

