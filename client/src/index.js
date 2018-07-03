import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import './stylesheets/site.css';

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

ReactDOM.render(<App />, document.getElementById('root'));

// registerServiceWorker();
