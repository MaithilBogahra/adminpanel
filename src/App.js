import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Medicines from './Containers/Medicines/Medicines';
import Patient from './Containers/Patient/Patient';

function App(props) {
    return (
        <Layout>
        <Switch>
            <Route path={"/medicines"} exact component={Medicines} />
            <Route path={"/patient"} exact component={Patient} />
        </Switch>
        </Layout>
    );
}

export default App;