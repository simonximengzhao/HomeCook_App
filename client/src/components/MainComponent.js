import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Recipes from './RecipesComponent';
import Privacy from './PrivacyComponent';
import Terms from './TermsComponent';
import Signup from './SignupComponent';
import User from './UserComponent';
import Admin from './AdminComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { actions } from 'react-redux-form';
import { connect } from 'react-redux';
import { postFeedback, searchRecipes, signup, loginUser, 
    logoutUser, postFavorite, fetchFavorites, deleteFavorite,
    fetchFeedback, deleteFeedback } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        auth: state.auth,
        favorites: state.favorites,
        feedback: state.feedback
    }
}

const mapDispatchToProps = dispatch => ({
    postFeedback: (name, agree, contactType, message) => dispatch(postFeedback(name, agree, contactType, message)),
    signup: (username, password, confirmPassword, firstname, lastname, telnum, email, agree) => dispatch(signup(
        username, password, confirmPassword, firstname, lastname, telnum, email, agree
        )),
    resetFeedbackForm: () => { dispatch(actions.reset('feedbackForm'))},
    resetSignupForm: () => { dispatch(actions.reset('signup'))},
    searchRecipes: (ingredients) => dispatch(searchRecipes(ingredients)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    postFavorite: (recipe) => dispatch(postFavorite(recipe)),
    fetchFavorites: () => dispatch(fetchFavorites()),
    deleteFavorite: (recipe) => dispatch(deleteFavorite(recipe)),
    fetchFeedback: () => dispatch(fetchFeedback()),
    deleteFeedback: (feedback) => dispatch(deleteFeedback(feedback))
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchFavorites();
        this.props.fetchFeedback();
      }
    //Render Method
    render() {

        //Home page component
        const HomePage = () => {
            return(
                <Home searchRecipes = {this.props.searchRecipes} /> 
            );
        }

        //Recipes page component
        const RecipesPage = () => {
            return(
                <Recipes recipes = {this.props.recipes.recipes}
                    recipesLoading = {this.props.recipes.isLoading}
                    recipesErrMess = {this.props.recipes.errMess}
                    auth={this.props.auth}
                    postFavorite={this.props.postFavorite}
                />
            );
        }

        //Private route for logged-in user
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                  }} />
            )} />
        );

        //Admin route for admin user
        const AdminRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.auth.isAdmin === 'true'
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                  }} />
            )} />
        );

        //Return the pages as following
        return(
            <div>
                <Header auth={this.props.auth}
                    loginUser={this.props.loginUser}
                    logoutUser={this.props.logoutUser}
                    fetchFavorites={this.props.fetchFavorites}
                    fetchFeedback={this.props.fetchFeedback}
                     />
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route path="/recipes" component={RecipesPage} />
                        <Route exact path="/aboutus" component={() => 
                        <About auth={this.props.auth} 
                            fetchFavorites={this.props.fetchFavorites} />} />
                        <Route exact path="/privacypolicy" component={() => <Privacy />} />
                        <Route exact path="/termsofuse" component={() => <Terms />} />
                        <Route exact path="/signup" component={() => <Signup signup={this.props.signup}
                            resetSignupForm={this.props.resetSignupForm} auth={this.props.auth} />} />
                        <PrivateRoute exact path="/user" 
                            component={() => 
                                <User favoritesLoading={this.props.favorites.isLoading}
                                    favoritesErrMess={this.props.favorites.errMess}
                                    favorites={this.props.favorites.favorites}
                                    deleteFavorite={this.props.deleteFavorite}
                                    postFeedback={this.props.postFeedback}
                                    resetFeedbackForm={this.props.resetFeedbackForm}
                                    auth={this.props.auth}
                                />} />
                        <AdminRoute exact path="/admin" component={() => <Admin auth={this.props.auth}
                            deleteFeedback={this.props.deleteFeedback}
                            feedback={this.props.feedback.feedback}
                            feedbackLoading={this.props.feedback.isLoading}
                            feedbackErrMess={this.props.feedback.errMess}
                            fetchFeedback={this.props.fetchFeedback} />} />
                        <Redirect to="/home" />
                    </Switch>
                <Footer auth={this.props.auth} fetchFavorites={this.props.fetchFavorites} fetchFeedback={this.props.fetchFeedback} />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));