import { applyMidlleWare, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory';
import reducer from './reducer';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
//const myRouterMiddleware = routerMiddleware(history);

export const store = createStore(
    reducer,
    composeWithDevTools(applyMidlleWare(thunk)) 
)
//Abi burayı anlamadım?!
