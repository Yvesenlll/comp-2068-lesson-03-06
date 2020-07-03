const viewPath = ('blogs');
const Blog = require('../models/blog');
const User = require('../models/user');

exports.index = async (req, res) => {
    try{
        const blogs = await Blog
        .find()
        .populate('user')
        .sort({updatedAt: 'desc'});

        res.render(`${viewPath}/index`, {
        pageTitle: 'Archive',
        blogs: blogs
        }); 
    }catch(error){
        req.flash('danger', `There was an error displaying the archive: ${error}`)
        res.redirect('/')
    }
};

exports.show = async (req, res) => {
    try {
        // console.log(req.params);
    const blog = await Blog.findById(req.params.id)
    .populate('user');
    // req.flash('success', 'test 123');
     res.render(`${viewPath}/show`, {
         pageTitle: blog.title,
         blog: blog
     });
    } catch (error) {
        req.flash('danger', `There was an error displaying the blog: ${error}`)
        res.redirect('/')
    }
    
};

exports.new = (req,res) => {

    res.render(`${viewPath}/new`, {
        pageTitle: "New Log"
    });
};

exports.create = async (req,res) => {

    console.log(`Blog body: ${JSON.stringify(req.body, null, 2)}`);
    
    //delete req.body.title;
    //  Blog.create(
    //     //{ title: req.body.title,
    //     // content: req.body.content,
    //     // status: req.body.status}
    //     req.body).then(blog => {
    //         console.log(blog);
    //     }).catch(err => {
    //         console.log(`ERROR: ${err}`);
    //     });

    // in case there will be some errors, we use try catch
    try {
        const {user: email} = req.session.passport;
        const user = await user.findOne({email: email});
        const blogID = await Blog.create({user: user._id, ...req.body});        
        req.flash('success', 'Blog created successfully');
        
        res.redirect(`/blogs/${blogID.id}`);
    } catch (error) {
        req.flash('danger', `There was an error creating the blog: ${error}`);
        req.session.formData = req.body;
        res.redirect('blogs/new');
    }

};

exports.edit = async (req, res) => {

    try {
        const blog = await Blog.findById(req.params.id);
     // req.flash('success', 'test 123');
        res.render(`${viewPath}/edit`, {
        pageTitle: blog.title,
        formData: blog
     });
    } catch (error) {
        req.flash('danger', `There was an error accessing the blog: ${error}`)
        res.redirect('/')
    }
};

exports.update = async (req, res) => {
    try {
        const {user: email} = req.session.passport;
        const user = await user.findOne({email: email});

        let blog = await Blog.findById(req.body.id);
        if (!blog) throw new Error('Blog could not be found');
        
        const attributes = {user: user._id, ...req.body};

    //   await Superhero.validate(req.body);
    //   await Superhero.updateOne({_id: req.body.id}, {name: req.body.name, alias: req.body.alias});
    await Blog.validate(req.body);
    // await Blog.updateOne({_id: req.body.id}, req.body);
    await Blog.findByIdAndUpdate(req.body.id, req.body)
  
      req.flash('success', 'The blog was updated successfully');
      res.redirect(`/blogs/${req.body.id}`);
    } catch (error) {
      req.flash('danger', `There was an error updating this blog: ${error}`);
      res.redirect(`/blogs/${req.body.id}/edit`);
    }
};


exports.delete = async (req, res) => {
    try {
          console.log(req.body);
          await Blog.deleteOne({_id: req.body.id});
          req.flash('success', 'The blog was deleted successfully');
          res.redirect(`/blogs`);
        } catch (error) {
          req.flash('danger', `There was an error deleting this blog: ${error}`);
          res.redirect(`/blogs`);
        }
};




