// Reducer
// Reducers only update the stats
import { combineReducers } from 'redux';
import app from './app';
import user from './user';



const rootReducer = combineReducers({
	app,
	user,
});

export default rootReducer;
