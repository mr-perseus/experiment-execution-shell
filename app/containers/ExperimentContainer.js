import React from 'react';
import type { ExperimentConfig } from '../utils/configTypes';
import { useExperimentData } from './ExperimentDataContext';
import {
  ExperimentNavigation,
  useExperimentNavigation
} from './ExperimentNavigationContext';
import {
  CurrentExperimentContext,
  CurrentExperimentPartContext
} from '../utils/experimentSubContexts';
import ExperimentRunner from '../components/experiments/ExperimentRunner';

export default () => {
  const experiments: ExperimentConfig[] = useExperimentData();
  const experimentNavigation: ExperimentNavigation = useExperimentNavigation();
  const experiment: ExperimentConfig =
    experiments[experimentNavigation.getExperimentNumber()];

  const experimentPart = experimentNavigation.isPractice()
    ? experiment.practiceConfig
    : experiment.stimuliConfig;

  return (
    <div
      style={{
        overflow: 'hidden',
        height: '98vh',
        boxSizing: 'border-box',
        cursor: 'none'
      }}
    >
      <CurrentExperimentContext.Provider value={experiment}>
        <CurrentExperimentPartContext.Provider value={experimentPart}>
          <ExperimentRunner />
        </CurrentExperimentPartContext.Provider>
      </CurrentExperimentContext.Provider>
    </div>
  );
};
