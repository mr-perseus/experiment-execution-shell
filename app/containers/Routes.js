import React from 'react';
import { Route, Router, Switch } from 'react-router';
import { createMemoryHistory } from 'history';
import routes from '../constants/routes';
import App from './App';
import Config from '../components/Config';
import PatientDataContainer from './PatientDataContainer';
import Completion from '../components/Completion';
import Export from '../components/Export';
import Home from '../components/Home';
import GoodBye from '../components/GoodBye';
import Escape from '../components/experiments/ExperimentEscape';
import ExperimentContainer from './ExperimentContainer';
import Help from '../components/Help';
import ExperimentIntroduction from './ExperimentIntroductionContainer';

export default () => {
  const history = createMemoryHistory();

  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route path={routes.HELP} component={Help} />
          <Route path={routes.CONFIG} component={Config} />
          <Route path={routes.PATIENT_DATA} component={PatientDataContainer} />
          <Route path={routes.GOOD_BYE} component={GoodBye} />
          <Route path={routes.COMPLETION} component={Completion} />
          <Route path={routes.EXPORT} component={Export} />
          <Route path={routes.EXPERIMENT_ESCAPE} component={Escape} />
          <Route
            path={routes.EXPERIMENT_INTRODUCTION}
            component={ExperimentIntroduction}
          />
          <Route
            path={routes.EXPERIMENT_CONTAINER}
            component={ExperimentContainer}
          />
          <Route path={routes.HOME} component={Home} />
        </Switch>
      </App>
    </Router>
  );
};
