const mongoose = require('mongoose');

//It's our server module 
let ArticleSchema = {
    text: String,
    title: String,
    description: String,
    feature_img: String,
    claps: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            author: {
                // Describing an ID like this..
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: String
        }
    ]
}

ArticleSchema.methods.clap = function () {
    this.claps++;
    return this.save();
}

ArticleSchema.methods.comment = function (userComment) {
    this.comments.push(userComment);
    return this.save();
}

ArticleSchema.methods.addAuthor = function (author_id) {
    this.author = author_id;
    return this.save();
}

ArticleSchema.methods.getUserArticle = function(_id) {
    Article.find({ 'author ': _id }).then((article) => {
        return article;
    })
}

module.export = mongoose.model('Article', ArticleSchema);