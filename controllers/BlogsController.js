const viewPath = ('blogs');
const Blog = require('../models/blog');

exports.index = (req, res) => {
    res.send('this is index');
};

exports.show = async (req, res) => {
    // console.log(req.params);
    const blog = await Blog.findById(req.params.id);
    res.render(`${viewPath}/show`, {
        pageTitle: blog.title,
        blog: blog
    });
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
        const blogID = await Blog.create(req.body);        
        res.redirect(`/blogs/${blogID.id}`);
    } catch (error) {
        res.error(error);
    }

};

exports.edit = (req, res) => {
    res.send('Hi there');
};

exports.update = (req, res) => {
    res.send('WOWza');
};

exports.delete = (req, res) => {
    res.send('Goodbye');
};




