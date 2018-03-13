// Reducer
// Reducers only update the State
import * as actionType from '../actionTypes/actionTypes';

const app = (state = {
	loginMethod: '',
	loginDialogOpen: false,
	loginError: '',
	drawer: false,
	getNotifiedEmail: '',
	getNotifiedRequested: false,		
	// email: '',
	// password: '',
	// rememberMe: false,
	showPassword: false,
	forgotPassword: false,
	forgotPasswordMessage: '',
	createAccount: false,
	createAccountMessage: '',
	pageYOffset: 0,
}, action) => {
		switch (action.type) {
			case actionType.SET_APP_STATE:
				return {
					...state,
					...action.data,
				}
			case actionType.CLEAR_APP_STATE:
				return {
					loginMethod: '',
					loginDialogOpen: false,
					loginError: '',
					drawer: false,
					getNotifiedEmail: '',
					getNotifiedRequested: false,		
					email: '',
					password: '',
					confirmPassword: '',
					rememberMe: false,
					showPassword: false,
					forgotPassword: false,
					forgotPasswordMessage: '',
					pageYOffset: 0,					
					createAccount: false,
					createAccountMessage: '',

				}
			default:
				return state;
		}
}
export default app;
