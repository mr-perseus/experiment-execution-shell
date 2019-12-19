import React from 'react';
import { Redirect } from 'react-router';
import routes from '../constants/routes';
import ControlBar from '../components/elements/NavigationBar';
import { Form } from '../components/elements/Form';
import PatientDataFields from '../components/PatientDataFields';

export default () => {
  const [firstExperimentStarted, startFirstExperiment] = React.useState(false);

  if (firstExperimentStarted) {
    return <Redirect to={`${routes.EXPERIMENT_INTRODUCTION}/Practice/0`} />;
  }

  return (
    <Form>
      <PatientDataFields />
      <ControlBar
        onNext={() => startFirstExperiment(true)}
        title="Start Tests"
        backRoute={routes.HOME}
      />
    </Form>
  );
};
