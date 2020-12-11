import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom'

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Adding redux and reducers
import { createStore, applyMiddleware  } from "redux";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import rootReducer from "./reducers";

// Creates our store to use our reducers and the chrome extension to debug the redux store
const store = createStore(
	rootReducer,
	applyMiddleware(thunk),
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	// Connects the store to our application
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
