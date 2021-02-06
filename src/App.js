import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Switch } from 'react-router'
import Main from "./Main";
import ContactInfo from "./ContactInfo";

import Photos from "./Photos";
import Publication from "./Publication";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Main} exact />
                <Route path="/contact" component={ContactInfo} />
                <Route path="/photos" component={Photos} />
                <Route path="/public" component={Publication} />
            </Switch>
        </Router>
    );
}

export default App;
