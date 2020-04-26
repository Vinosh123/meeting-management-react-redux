import { applyMiddleware, createStore } from 'redux';
import appReducer from '../Reducers/appReducer';
import thunk from 'redux-thunk';

let store = applyMiddleware(thunk)(createStore)(appReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;