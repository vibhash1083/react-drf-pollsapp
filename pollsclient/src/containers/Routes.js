import React from 'react';
import { Router, Route } from 'react-router';

import App from '../components/App';
import Single from '../components/Single';


export default (
	<Router>
	    <Route path="/" component={App}/>
	    <Route path="question/:id" component={Single}/>
    </Router>
)