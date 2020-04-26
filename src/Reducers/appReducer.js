import { combineReducers } from 'redux'
import loginLogoutReducer from './loginLogoutReducer.js';
import meetingReducer from './meetingReducer';

const appReducer = combineReducers({
 loginLogoutReducer,meetingReducer
})
export default appReducer;
