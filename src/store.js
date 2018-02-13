import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducers';
import thunk from 'redux-thunk';

const middleware = [ thunk ]

const reducer = rootReducer

function configureStore () {
  let store = createStore(
    reducer,
      applyMiddleware(
        ...middleware
      ),
  );
  return { store }  
}
export default configureStore;
