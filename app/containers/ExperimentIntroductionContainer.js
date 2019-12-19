import React from 'react';
import { Redirect } from 'react-router';
import path from 'path';
import { remote } from 'electron';
import * as fs from 'fs';
import {
  ExperimentNavigation,
  useExperimentNavigation
} from './ExperimentNavigationContext';
import routes from '../constants/routes';
import ExperimentIntroduction from '../components/experiments/ExperimentIntroduction';
import {
  useExperimentResultsDispatch,
  useExperimentResultsState
} from '../utils/experimentResultsContext';
import type {
  ExperimentConfig,
  ExperimentStepResult
} from '../utils/configTypes';
import { useExperimentData } from './ExperimentDataContext';
import { useUserState } from '../utils/userContext';
import csvCreate, { getExperimentGroupNames } from '../utils/csvCreate';

export default () => {
  const experimentNavigation: ExperimentNavigation = useExperimentNavigation();
  const experimentNumber = experimentNavigation.getExperimentNumber();
  const experiments = useExperimentData();
  const resultDispatch = useExperimentResultsDispatch();
  const experimentResults: ExperimentStepResult[] = useExperimentResultsState();
  const user = useUserState();

  const [practiceStarted, setPracticeStarted] = React.useState(false);
  const [stimuliStarted, setStimuliStarted] = React.useState(false);

  const experimentNames = getExperimentGroupNames(experimentResults);

  experimentNames.forEach((groupName: string) => {
    const csv: string = csvCreate(experimentResults, groupName, user.id);

    fs.writeFile(
      path.join(remote.app.getPath('userData'), `${groupName}${user.id}.csv`),
      csv,
      () => {}
    );
  });

  if (practiceStarted || stimuliStarted) {
    const experiment: ExperimentConfig = experiments[experimentNumber];
    const type = practiceStarted ? 'Practice' : 'Stimuli';

    resultDispatch({
      type: 'resetCurrent',
      groupName: experiment.groupName || experiment.name,
      name: experiment.name,
      partName: type
    });
    return (
      <Redirect
        to={`${routes.EXPERIMENT_CONTAINER}/${type}/${experimentNumber}`}
      />
    );
  }

  return (
    <ExperimentIntroduction
      onPracticeStart={() => setPracticeStarted(true)}
      onStimuliStart={() => setStimuliStarted(true)}
    />
  );
};
