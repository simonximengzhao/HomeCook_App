import * as ActionTypes from './ActionTypes';

export const Recipes = (state = {
        isLoading: true,
        errMess: null,
        recipes: []
    }, action ) => {
    switch(action.type) {
        case ActionTypes.ADD_RECIPES:
            return {...state, isLoading: false, errMess: null, recipes: action.payload}

        case ActionTypes.RECIPES_LOADING:
            return {...state, isLoading: true, errMess: null, recipes: []}

        case ActionTypes.RECIPES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, recipes: []}

        default:
            return state;
    }
}