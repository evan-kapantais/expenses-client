import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import './style/register.scss';
import './style/forms.scss';
import './style/dark.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './context/Context';

ReactDOM.render(
	<React.StrictMode>
		<Provider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
