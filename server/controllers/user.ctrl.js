const User = require('../models/User');
const Article = require('../models/Article');

module.exports = {
    addUser: (req,res,next) => {
        new User(req.body).save((error, newUser) => {
            if (error) {
                res.sendStatus(error);
            } else if (!newUser) {
                res.sendStatus(400);
            } else {
                res.sendStatus(newUser);
            }
        })
    },

    getUser: (req, res, next) => {
        User.findById(req.params.id).then
        /*populate('following').exec*/((err, user)=> {
            if (err)
                res.sendStatus(err)
            else if (!user)
                res.sendStatus(404)
            else
                res.sendStatus(user)
            next()            
        })
    },

    followUser: (req, res, next) => {
        User.findById(req.body.id).then((user) => {
            return user.follow(req.body.user_id).then(() => {
                return res.json({msg: "followed"})
            })
        }).catch(next)
    },
    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then
        ((_user) => {
            return User.find({'following': req.params.id}).then((_users)=>{
                _users.forEach((user_)=>{
                    _user.addFollower(user_)
                })
                return Article.find({'author': req.params.id}).then((_articles)=> {
                    return res.json({ user: _user, articles: _articles })
                })
            })
        }).catch((err)=>console.log(err))
    }
}