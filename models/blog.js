const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true // this must exist
    },
    content:{
        type: String,
        required: false
    },
    status:{
        type: String,
        enum: ['DRAFT', 'PUBLISHED'],
        default: 'DRAFT'
    }, 
}, {
    timestamps: true
});

// Query helpers
BlogSchema.query.drafts = function () {
    return this.where({
        status: 'DRAFT'
    })
};

BlogSchema.query.published = function () {
    return this.where({
        status: 'PUBLISHED'
    })
};

BlogSchema.virtual('synopsts')
.get(function(){
    const post = this.content;
    return post
    .replace(/(<([^>]+)>)/ig,"")
    .substring(0,250);
});
      
module.exports = mongoose.model('Blog', BlogSchema);



