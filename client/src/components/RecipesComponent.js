import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardGroup, CardHeader, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

//find all types of cuisines
function cuisinesFilter(recipes) {
    const cuisines = [];
    for (let i=0; i<recipes.length; i++) {
        let cuisine = recipes[i].cuisine_type;
        if (cuisine){
            cuisine = cuisine[0].toUpperCase();
            if (!cuisines.includes(cuisine)) {
                cuisines.push(cuisine);
            }
        }
    }
    
    const items = [];
    for (const [index, value] of cuisines.entries()) {
        items.push(<option key={index} value={value}>{value}</option>)
    }

    return(
        <>
            <option value='default'>Cuisine Type</option>
            {items}
        </>
    );
};

//find all types of meals
function mealsFilter(recipes) {
    const meals = [];
    for (let i=0; i<recipes.length; i++) {
        let meal = recipes[i].meal_type;
        if (meal){
            meal = meal[0].toUpperCase();
            if (!meals.includes(meal)) {
                meals.push(meal);
            }
        }
    }
    
    const items = [];
    for (const [index, value] of meals.entries()) {
        items.push(<option key={index} value={value}>{value}</option>)
    }

    return(
        <>
            <option value='default'>Meal Type</option>
            {items}
        </>
    );
};

//Render the recipes as menu items
function RenderMenuItem({recipe, auth, postFavorite}) {
    return (
        <CardGroup>
            <a id='recipe-card' target='_blank' href={recipe.url} rel="noreferrer">
                <Card id='recipe-card' className='h-100'>
                        <CardHeader className='text-secondary'>{recipe.name}</CardHeader>
                        { auth ?
                            <CardBody className="d-flex flex-column">
                                <CardImg id="card-img-top" src={recipe.image} alt='No image availabe' />
                                <Button color='info' className='mt-auto' onClick={e => {
                                    e.preventDefault();
                                    console.log(recipe);
                                    postFavorite(recipe);
                                }}>
                                    Save
                                </Button>
                            </CardBody>
                            :
                            <CardBody className="d-flex flex-column">
                                <CardImg id="card-img-top" src={recipe.image} alt='No image availabe' />
                            </CardBody>
                        }
                </Card>
            </a>
        </CardGroup>
    );
};

class Recipes extends Component {
    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.recipes,
            recipes: this.props.recipes,
            cuisineFiltered: false,
            mealFiltered: false,
            filteredRecipes: null,
            recipesFilteredByCuisine: null,
            recipesFilteredByMeal: null
        }

        this.sortingChangeHandler = this.sortingChangeHandler.bind(this);
        this.cuisineFilter = this.cuisineFilter.bind(this);
        this.mealFilter = this.mealFilter.bind(this);
    }

    sortingChangeHandler(event){
        if (event.target.value === 'default') {
            console.log('Default sorting');
            this.setState({ recipes: this.state.data });
        }
        else if (event.target.value === 'name') {
            if (this.state.cuisineFiltered || this.state.mealFiltered) {
                const newData = [].concat(this.state.filteredRecipes)
                    .sort((a, b) => a.name > b.name ? 1: -1);
                console.log('Sorting by name');
                this.setState({ filteredRecipes: newData });
            }
            else {
                const newData = [].concat(this.state.recipes)
                    .sort((a, b) => a.name > b.name ? 1: -1);
                console.log('Sorting by name');
                this.setState({ recipes: newData });
            }
        }
        else {
            if (this.state.cuisineFiltered || this.state.mealFiltered) {
                const newData = [].concat(this.state.filteredRecipes)
                    .sort((a, b) => a.calories > b.calories ? 1: -1);
                console.log('Sorting by calories');
                this.setState({ filteredRecipes: newData });
            }
            else {
                const newData = [].concat(this.state.recipes)
                    .sort((a, b) => a.calories > b.calories ? 1: -1);
                console.log('Sorting by calories');
                this.setState({ recipes: newData });
            }
        }
    }

    cuisineFilter(event) {
        var dropDown = document.getElementById('selector');
        dropDown.selectedIndex = 0;
        if (event.target.value === 'default' && !this.state.mealFiltered) {
            console.log('No cuisine filter applied');
            this.setState({cuisineFiltered: false});
            this.setState({filteredRecipes: this.state.recipes});
            this.setState({recipesFilteredByCuisine: null});
        }
        else if (event.target.value === 'default' && this.state.mealFiltered) {
            console.log('No cuisine filter applied');
            this.setState({cuisineFiltered: false});
            this.setState({filteredRecipes: this.state.recipesFilteredByMeal});
            this.setState({recipesFilteredByCuisine: null});
        }
        else if (event.target.value !== 'default' && !this.state.mealFiltered) {
            console.log('Cuisine filter applied');
            let newData = [];
            for (let i=0; i<this.state.recipes.length; i++){
                if (this.state.recipes[i].cuisine_type) {
                    if (this.state.recipes[i].cuisine_type[0].toUpperCase() === event.target.value) {
                        newData.push(this.state.recipes[i]);
                    }
                }
            }
            this.setState({cuisineFiltered: true});
            this.setState({filteredRecipes: newData});
            this.setState({recipesFilteredByCuisine: newData});
        }
        else if (event.target.value !== 'default' && this.state.mealFiltered) {
            console.log('Cuisine filter applied');
            let newData = [];
            let newUpdatedData = [];
            for (let i=0; i<this.state.recipes.length; i++){
                if (this.state.recipes[i].cuisine_type) {
                    if (this.state.recipes[i].cuisine_type[0].toUpperCase() === event.target.value) {
                        newData.push(this.state.recipes[i]);
                    }
                }
            }
            for (let i=0; i<this.state.recipesFilteredByMeal.length; i++){
                if (this.state.recipesFilteredByMeal[i].cuisine_type) {
                    if (this.state.recipesFilteredByMeal[i].cuisine_type[0].toUpperCase() === event.target.value) {
                        newUpdatedData.push(this.state.recipesFilteredByMeal[i]);
                    }
                }
            }
            this.setState({cuisineFiltered: true});
            this.setState({filteredRecipes: newUpdatedData});
            this.setState({recipesFilteredByCuisine: newData});
        }
    }

    mealFilter(event) {
        var dropDown = document.getElementById('selector');
        dropDown.selectedIndex = 0;
        if (event.target.value === 'default' && !this.state.cuisineFiltered) {
            console.log('No meal filter applied');
            this.setState({mealFiltered: false});
            this.setState({filteredRecipes: this.state.recipes});
            this.setState({recipesFilteredByMeal: null});
        }
        else if (event.target.value === 'default' && this.state.cuisineFiltered) {
            console.log('No meal filter applied');
            this.setState({mealFiltered: false});
            this.setState({filteredRecipes: this.state.recipesFilteredByMeal});
            this.setState({recipesFilteredByMeal: null});
        }
        else if (event.target.value !== 'default' && !this.state.cuisineFiltered) {
            console.log('Meal filter applied');
            let newData = [];
            for (let i=0; i<this.state.recipes.length; i++){
                if (this.state.recipes[i].meal_type) {
                    if (this.state.recipes[i].meal_type[0].toUpperCase() === event.target.value) {
                        newData.push(this.state.recipes[i]);
                    }
                }
            }
            this.setState({mealFiltered: true});
            this.setState({filteredRecipes: newData});
            this.setState({recipesFilteredByMeal: newData});
        }
        else if (event.target.value !== 'default' && this.state.cuisineFiltered) {
            console.log('Meal filter applied');
            let newData = [];
            let newUpdatedData = [];
            for (let i=0; i<this.state.recipes.length; i++){
                if (this.state.recipes[i].meal_type) {
                    if (this.state.recipes[i].meal_type[0].toUpperCase() === event.target.value) {
                        newData.push(this.state.recipes[i]);
                    }
                }
            }
            for (let i=0; i<this.state.recipesFilteredByCuisine.length; i++){
                if (this.state.recipesFilteredByCuisine[i].meal_type) {
                    if (this.state.recipesFilteredByCuisine[i].meal_type[0].toUpperCase() === event.target.value) {
                        newUpdatedData.push(this.state.recipesFilteredByCuisine[i]);
                    }
                }
            }
            this.setState({mealFiltered: true});
            this.setState({filteredRecipes: newUpdatedData});
            this.setState({recipesFilteredByMeal: newData});
        }
    }

    render() {
        let filtered;
        if (this.state.cuisineFiltered || this.state.mealFiltered) {
            filtered = true;
        }
        else {
            filtered = false;
        }

        let menu;
        if (filtered) {
            menu = this.state.filteredRecipes.map((recipe) => {
                return(
                    <div key={recipe.recipeId} className='col-auto mb-3 d-flex'>
                        <RenderMenuItem recipe={recipe} auth={this.props.auth.isAuthenticated}
                            postFavorite={this.props.postFavorite} />
                    </div>
                );
            });
        }
        else {
            menu = this.state.recipes.map((recipe) => {
                return(
                    <div key={recipe.recipeId} className='col-auto mb-3 d-flex'>
                        <RenderMenuItem recipe={recipe} auth={this.props.auth.isAuthenticated}
                            postFavorite={this.props.postFavorite} />
                    </div>
                );
            });
        }

        // loading recipes
        if (this.props.recipesLoading) {
            return(
                <div className="container">
                    <Loading />
                </div>
            );
        }
        // error occurred
        else if (this.props.recipesErrMess) {
            return (
                <div className="container mt-3 mb-3">
                    <div className="row">
                        <h4>{this.props.recipesErrMess}</h4>
                    </div>
                </div>
            );
        }
        // no recipes found
        else if (this.props.recipes.length === 0){
            return (
                <div className="container">
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Recipes</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12 mt-3">
                            <h3 style={{fontFamily: "'Libre Baskerville', serif"}}>Recipes</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3 mb-3">
                        <h4>No recipes found.</h4>
                        {console.log(this.props.recipes)}
                    </div>
                </div>
            );
        }
        // display recipes
        else {
            return (
                <div className="container">
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Recipes</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12 mt-3">
                            <h3 style={{fontFamily: "'Libre Baskerville', serif"}}>Recipes <img id='edamam-badge' src={baseUrl + "/images/white.png"} alt='edamam-badge' /></h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="select mb-3 ml-3">
                            <select id='selector' onChange={this.sortingChangeHandler}>
                                <option value='default'>Sort by</option>
                                <option value='name'>NAME</option>
                                <option value='calories'>CALORIES</option>
                            </select>
                            <select id='dropdown' onChange={this.cuisineFilter}>
                                {cuisinesFilter(this.state.data)}
                            </select>
                            <select id='dropdown' onChange={this.mealFilter}>
                                {mealsFilter(this.state.data)}
                            </select>
                        </div>
                    </div>
                    <div className='row justify-content-center mb-5'>
                        {menu}
                    </div>
                </div>
            );
        }
    };
}

export default Recipes