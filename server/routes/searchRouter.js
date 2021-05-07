const config = require('../config.json');
const express = require('express');
const cors = require('./cors');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const searchRouter = express.Router();

searchRouter.use(express.json());

// set up async function
var axios = require("axios").default;
var options = {
    method: 'GET',
    url: config["recipe_api_url"],
    params: { app_id: config['app_id'], app_key: config['app_key'],q: "", from: config['from'], to: config['to'] },
    //headers: config["recipe_api_headers"]
};

// search recipes by ingredients
searchRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(
    cors.corsWithOptions, 
    // must have key "ingredients"
    body('ingredients').exists(),
    async function (req, res) {
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let recipes = await send_request(req.body["ingredients"])
        console.log(recipes)
        res.send(recipes)
});

// recipes filter
function recipe_filter(res) {
    let num = res.data.hits.length;
    let recipes = [];
    for (let i=0; i<num; i++) {
        let recipe = {
            recipeId: uuidv4(),
            name: res.data.hits[i].recipe.label,
            image: res.data.hits[i].recipe.image,
            url: res.data.hits[i].recipe.url,
            calories: res.data.hits[i].recipe.calories,
            cuisine_type: res.data.hits[i].recipe.cuisineType,
            meal_type: res.data.hits[i].recipe.mealType
        };
        recipes.push(recipe);
    }
    return recipes
}

async function send_request(ingredients) {
    options.params["q"] = ingredients
    console.log(options)
    let res = await axios.request(options).catch(function (error) {
        console.error(error);
    })
    console.log(res.data);
    return (recipe_filter(res));
};

module.exports = searchRouter;