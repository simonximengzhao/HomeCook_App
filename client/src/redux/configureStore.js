import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
import { InitialSignup } from './signup';
import { Recipes } from './recipes';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Auth } from './auth';
import { favorites } from './favorites';
import { feedback } from './feedback';

const persistConfig = {
    key: 'recipes',
    storage,
}
   
const persistedReducer = persistReducer(persistConfig, Recipes);

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            recipes: persistedReducer,
            auth: Auth,
            favorites: favorites,
            feedback,
            ...createForms({
                feedbackForm: InitialFeedback,
                signup: InitialSignup
            })
        }),
        applyMiddleware(thunk, logger)
    );
    let persistor = persistStore(store);

    return { store, persistor };
};