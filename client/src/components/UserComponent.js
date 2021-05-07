import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardGroup, CardHeader, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import Feedback from './FeedbackForm';

class User extends Component {

    //Constructor
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.favorites,
            favorites: this.props.favorites
        }
        this.RenderMenuItem=this.RenderMenuItem.bind(this);
    }

    //Render the recipes as menu items
    RenderMenuItem(recipe) {
        return (
            <CardGroup>
                <a id='recipe-card' target='_blank' href={recipe.url} rel="noreferrer">
                    <Card id='recipe-card' className='h-100'>
                            <CardHeader className='text-secondary'>{recipe.name}</CardHeader>
                            <CardBody className="d-flex flex-column">
                                <CardImg id="card-img-top" src={recipe.image} alt='No image availabe' />
                                <Button color='info' className='mt-auto' onClick={e => {
                                    e.preventDefault();
                                    const currentFavorites = this.state.favorites;
                                    this.setState({favorites: currentFavorites.filter(favorites => favorites.recipeId !== recipe.recipeId)});
                                    this.props.deleteFavorite(recipe);
                                    alert('Recipe is deleted.');
                                }}>
                                    Delete
                                </Button>
                            </CardBody>
                    </Card>
                </a>
            </CardGroup>
        );
    };

    render() {
        if (this.props.auth.isAdmin === 'true') {
            return (
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>User Portal</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12 mt-3 mb-3">
                            <h3 style={{fontFamily: "'Libre Baskerville', serif"}}>User Portal</h3>
                            <hr />
                            <h4>You are an administrator. Please go to <a href='/admin'>admin portal</a> instead.</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            // loading favorite recipes
            if (this.props.favoritesLoading) {
                return(
                    <div className="container">
                        <Loading />
                    </div>
                );
            }
            // error occurred
            else if (this.props.favoritesErrMess) {
                return (
                    <div className="container mt-3 mb-3">
                        <div className="row">
                            <h4>{this.props.favoritesErrMess}</h4>
                        </div>
                    </div>
                );
            }
            // no favorite recipes found
            else if (this.props.favorites.length === 0) {
                return (
                    <div className='container'>
                        <div className='row'>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active>User Portal</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12 mt-3 mb-3">
                                <h3 style={{fontFamily: "'Libre Baskerville', serif"}}>User Portal</h3>
                                <hr />
                                <h4>My saved recipes:</h4>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-3 mb-3">
                            <h4>No recipes saved.</h4>
                        </div>
                        <hr />
                        <div className='row justify-content-center'>
                            <div className="col-12 mt-3">
                                <h4>Contact us</h4>
                                <Feedback postFeedback={this.props.postFeedback} 
                                    resetFeedbackForm={this.props.resetFeedbackForm} />
                            </div>
                        </div>
                    </div>
                );
            }
            // display saved recipes
            else{
                const menu = this.state.favorites.map((recipe) => {
                    return(
                        <div key={recipe.recipeId} className='col-auto mb-3 d-flex'>
                            {this.RenderMenuItem(recipe)}
                        </div>
                    );
                });

                return(
                    <div className='container'>
                        <div className='row'>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active>User Portal</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12 mt-3 mb-3">
                                <h3 style={{fontFamily: "'Libre Baskerville', serif"}}>User Portal</h3>
                                <hr />
                                <h4>My saved recipes:</h4>
                            </div>
                        </div>
                        <div className="row justify-content-center mb-5">
                            {menu}
                        </div>
                        <hr />
                        <div className='row justify-content-center'>
                            <div className="col-12 mt-3">
                                <h4>Contact us</h4>
                                <Feedback postFeedback={this.props.postFeedback} 
                                    resetFeedbackForm={this.props.resetFeedbackForm} />
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default User;