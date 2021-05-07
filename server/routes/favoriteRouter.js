const express = require('express');
const Favorites = require('../models/favorite');
var authenticate = require('../authenticate');
const cors = require('./cors');

const router = express.Router();
router.use(express.json());

router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({user: req.user._id})
    .populate('user')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if(favorites == null)
            res.json({recipes: []});
        else
            res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite) {
            Favorites.find({
                recipes: {
                    $elemMatch: { url: req.body.url }
                }
            })
            .then((result) => {
                if (result.length !== 0) {
                    res.statusCode = 400;
                    res.end('Recipe already exists');
                }
                else {
                    favorite.recipes.push(req.body)
                    favorite.save()
                    .then((favorite) =>{
                        console.log('Favorite created ', favorite);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        if (favorite === null) {
                            res.json({recipes: []});
                        }
                        else {
                            res.json(favorite);
                        }
                    }, (err) => next(err))
                }
            })
        }
        else {
            Favorites.create({"user": req.user._id, "recipes": [req.body]})
            .then((favorite) => {
                console.log('Favorite created ', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                if (favorite === null) {
                    res.json({recipes: []});
                }
                else {
                    res.json(favorite);
                }
            }, (err) => next(err))
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite) {           
            Favorites.find({
                recipes: {
                    $elemMatch: { recipeId: req.body.recipeId }
                }
            })
            .then((result) => {
                if (result.length !== 0) {
                    const index = favorite.recipes.findIndex(item => item.recipeId === req.body.recipeId);
                    if (index >= 0) {
                        favorite.recipes.splice(index, 1);
                        favorite.save()
                        .then((favorite) => {
                            console.log('Favorite Deleted ', favorite);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            if(favorite == null)
                                res.json({recipes: []});
                            else
                                res.json(favorite);
                        }, (err) => next(err));
                    }
                    else {
                        res.statusCode = 400;
                        res.end('Recipe not found');
                    }
                }
                else {
                    res.statusCode = 400;
                    res.end('Recipe not found');
                }
            })
        }
        else {
            res.statusCode = 400;
            res.end('Recipe not found');
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;