// Entry Point
import React, {Component} from 'react';
import configureStore from './store';
import { Provider } from 'react-redux';
import App from './components/App';

let {store} = configureStore()


// function setup() {
	export default class Root extends Component {
		render(){
			return(
				<Provider store={store}>
					<App />
				</Provider>
			);
		}
	}
// 	return Root;
// }
// export default setup
// module.exports = setup;
