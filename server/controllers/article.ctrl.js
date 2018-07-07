const Article = require('../models/Article');
const User = require('../models/User');
const fs = require('fs');
const cloudinary = require('cloudinary');

module.exports = {
    addArticle: (req,res, next) => {
        let { text, title, claps, description } = req.body;
        if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, (result) => {
                let obj = 
                { 
                    text, 
                    title, 
                    claps, 
                    description, 
                    feature_image: result.url != null ? result.url : ''
                }
                saveArticle(obj);
            },{
                resource_type: 'image',
                eager: [
                    {effect: 'sepia'}
                ]
            })
        } else {
            saveArticle({
                text,
                title,
                claps,
                description,
                feature_image: ''
            })
        }

        function saveArticle(obj) {
            new Artcle(obj).save((error, article) => {
                if (error) {
                    res.send(error);
                } else if (!article){
                    res.send(400);
                } else {
                    return article.addArticle(req.body.author_id)
                        .then((_article) => {
                            return res.send(_article);
                        })
                }
                next();
            })
        }
    },
    getAll: (req, res, next) => {
        Article.find(req.params.id)
            .populate('author')
            .populate('comments.author').exec((error, article) => {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(404)
                else
                    res.send(article)
                next()
            })
    },
    clapArticle: (req, res, next) => {
        Artcile.findById(req.body.article_id)
            .then((article) => {
                return article.comment({
                    author: req.body.author_id,
                    text: req.body.comment
                }).then(() => {
                    return res.json({message: "Done!"})
                })
            }).catch(next);
    },
    getArticle: (req, res, next) => {
        Article.findById(req.params.id)
            .populate('author')
            .populate('commments.author').exec((err, article)=> {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(404)
                else
                    res.send(article)
                next()            
            })
    }
}