import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
//Split out css into components
import './stylesheets/site.css';
import './stylesheets/admin.css';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
