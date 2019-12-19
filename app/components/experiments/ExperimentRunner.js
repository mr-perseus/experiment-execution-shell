// @flow
import React, { useReducer } from 'react';
import ExperimentStep from './ExperimentStep';
import { useExperimentNavigation } from '../../containers/ExperimentNavigationContext';
import {
  CurrentExperimentContext,
  CurrentExperimentPartContext
} from '../../utils/experimentSubContexts';
import type {
  ExperimentConfig,
  ExperimentPartConfig,
  StepConfig
} from '../../utils/configTypes';

export default () => {
  const experimentNavigation = useExperimentNavigation();

  const experimentConfig: ExperimentConfig = React.useContext(
    CurrentExperimentContext
  );
  const experimentPartConfig: ExperimentPartConfig = React.useContext(
    CurrentExperimentPartContext
  );
  const steps: StepConfig[] = experimentPartConfig.steps;
  const subSteps = experimentPartConfig.subStepRefs.map(
    ref => experimentConfig.subSteps[ref]
  );

  const [stepIndex, setNextStepIndex] = useReducer((prevIndex, action) => {
    return action > prevIndex ? action : prevIndex;
  }, 0);

  if (stepIndex >= steps.length) {
    return experimentNavigation.completeExperiment();
  }

  const step = steps[stepIndex];
  const handleStepComplete = () => {
    setNextStepIndex(stepIndex + 1);
  };

  return (
    <ExperimentStep
      onComplete={handleStepComplete}
      step={step}
      subSteps={subSteps}
    />
  );
};
