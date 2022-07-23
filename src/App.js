import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Counter from './Containers/Counter/Counter';
import Medicines from './Containers/Medicines/Medicines';
import Patient from './Containers/Patient/Patient';
import { configureStore } from './Redux/store';

function App(props) {
    let store = configureStore()
    return (
        <Layout>
            <Provider store={store}>
                <Switch>
                    <Route path={"/medicines"} exact component={Medicines} />
                    <Route path={"/patient"} exact component={Patient} />
                    <Route path={"/counter"} exact component={Counter} />
                </Switch>
            </Provider>
        </Layout>
    );
}

export default App;