import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import history from '../history';

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});

export const feedbackLoading = () => ({
    type: ActionTypes.FEEDBACK_LOADING
});

export const feedbackFailed = (errmess) => ({
    type: ActionTypes.FEEDBACK_FAILED,
    payload: errmess
});

// fetch feedback for admin
export const fetchFeedback = () => (dispatch) => {
    dispatch(feedbackLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + '/comments', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        console.log(response)
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(feedback => {dispatch(addFeedback(feedback)); console.log(feedback);})
    .catch(error => dispatch(feedbackFailed(error.message)));
}

// post feedback
export const postFeedback = (name, agree, contactType, message) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    const newFeedback = {
            name: name,
            agree: agree,
            contactType: contactType,
            message: message,
        };

    return fetch(baseUrl + '/comments', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addFeedback(response)))
        .catch(error => {console.log('Post Feedback', error.message)
        })
};

// delete feedback
export const deleteFeedback = (comments) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + '/comments', {
        method: "DELETE",
        body: JSON.stringify({"comments": comments}),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
          },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
        return response;
        } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
        }
    },
    error => {
            throw error;
    })
    .then(response => response.json())
    .then(feedback => { console.log('Comment Deleted', feedback); dispatch(addFeedback(feedback)); })
    .catch(error => dispatch(feedbackFailed(error.message)));
};

// searching recipes
export const searchRecipes = (ingredients) => (dispatch) => {
    dispatch(recipesLoading(true));
    history.push('/recipes');

    return fetch(baseUrl + '/search', {
        method: "POST",
        body: JSON.stringify({"ingredients": ingredients}),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(recipes => {
        dispatch(addRecipes(recipes));
    })
    .catch(error => dispatch(recipesFailed(error.message)));
}

export const recipesLoading = () => ({
    type: ActionTypes.RECIPES_LOADING
});

export const recipesFailed = (errmess) => ({
    type: ActionTypes.RECIPES_FAILED,
    payload: errmess
});

export const addRecipes = (recipes) => ({
    type: ActionTypes.ADD_RECIPES,
    payload: recipes
});

export const register = (info) => ({
    type: ActionTypes.SIGNUP,
    payload: info
});

// sign-up
export const signup = (username, password, confirmPassword, firstname, lastname, telnum, email, agree) => (dispatch) => {

    if (password !== confirmPassword) {
        alert("Passwords don't match.");
        console.log(password);
        console.log(confirmPassword);
        return false;
    }

    if (!agree) {
        alert("Please read and accept our 'Terms of Use' before signing up.");
        return false;
    }

    else {
        const newSignup = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            telnum: telnum,
            email: email
        };
        
        return fetch(baseUrl + '/users/signup', {
            method: 'POST',
            body: JSON.stringify(newSignup),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    history.push('/');
                    alert('Sign-up successful! Please login.');
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(response => dispatch(register(response)))
            .catch(error => {
                console.log('Sign-up ', error.message);
                alert('Username already exists');   
            });
    }
};


//login
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        admin: response.admin
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + '/users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            localStorage.setItem('admin', response.admin);
            // Dispatch the success action
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => {
        dispatch(loginError(error.message));
        alert('Login failed. Please try again.')
    });
};

export const requestLogout = () => {
    return {
    type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
    type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('admin');
    localStorage.clear();
    dispatch(receiveLogout())
}

// Add favorite dishes to user page
export const postFavorite = (recipe) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + '/favorites', {
        method: "POST",
        body: JSON.stringify(recipe),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            alert('This dish has been saved.');
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => {
        dispatch(favoritesFailed(error.message));
        alert('You have saved this dish previously.')
    });
}

export const deleteFavorite = (recipe) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    const recipeId = recipe.recipeId;

    return fetch(baseUrl + '/favorites', {
        method: "DELETE",
        body: JSON.stringify({"recipeId": recipeId}),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
          },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
        return response;
        } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
        }
    },
    error => {
            throw error;
    })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites.recipes)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + '/favorites', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        console.log(response)
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites.recipes)))
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});