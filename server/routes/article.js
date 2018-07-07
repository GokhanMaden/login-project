const articleController = require('../controllers/article.ctrl');
const multipart = require('connect-multiparty');
const multipartWare = multipart();

module.exports = (router) => {
    // Get all articles
    router.route('/articles').get(articleController.getAll);

    // Add an article
    router.route('/article').post(multipartWare, articleController.addArticle);

    // Clap on an article
    router.route('/article/clap').post(articleController.clapArticle);

    // Comment an article
    router.route('/artcile/comment').post(articleController.commentArticle);

    // Get a particlular article to view
    router.route('/article/:id').get(articleController.getArticle);
}