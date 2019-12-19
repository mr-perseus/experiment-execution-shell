// @flow
import React from 'react';
import { Redirect, type RouterHistory, useHistory } from 'react-router';
import { useExperimentData } from './ExperimentDataContext';
import routes from '../constants/routes';
import type { ExperimentConfig } from '../utils/configTypes';
import { useExperimentResultsDispatch } from '../utils/experimentResultsContext';
import { useUserDispatch } from '../utils/userContext';

// eslint-disable-next-line flowtype/no-weak-types
const ExperimentNavigationContext: React$Context<ExperimentNavigation> = (React.createContext(): any);
export const useExperimentNavigation = (): ExperimentNavigation =>
  React.useContext(ExperimentNavigationContext);

export default ({ children }: { children: React$Node }) => {
  const experiments: ExperimentConfig[] = useExperimentData();
  const history: RouterHistory = useHistory();
  const resultDispatch = useExperimentResultsDispatch();
  const userDispatch = useUserDispatch();

  return (
    <ExperimentNavigationContext.Provider
      value={
        new ExperimentNavigation(
          experiments,
          history,
          resultDispatch,
          userDispatch
        )
      }
    >
      {children}
    </ExperimentNavigationContext.Provider>
  );
};

export class ExperimentNavigation {
  history: RouterHistory;

  experiments: ExperimentConfig[];

  userDispatch: ({ type: string }) => void;

  resultsDispatch: ({ type: string }) => void;

  constructor(
    experiments: ExperimentConfig[],
    history: RouterHistory,
    resultsDispatch: ({ type: string }) => void,
    userDispatch: ({ type: string }) => void
  ) {
    this.experiments = experiments;
    this.history = history;
    this.resultsDispatch = resultsDispatch;
    this.userDispatch = userDispatch;
  }

  completeExperiment() {
    const experimentNumber: number = this.getExperimentNumber();
    if (this.isPractice()) {
      return (
        <Redirect
          to={`${routes.EXPERIMENT_INTRODUCTION}/Stimuli/${experimentNumber}`}
        />
      );
    }
    const nextExperiment = experimentNumber + 1;
    if (nextExperiment < this.experiments.length) {
      return (
        <Redirect
          to={`${routes.EXPERIMENT_INTRODUCTION}/Practice/${nextExperiment}`}
        />
      );
    }
    return <Redirect to={routes.GOOD_BYE} />;
  }

  static completionRedirect() {
    return <Redirect to={routes.COMPLETION} />;
  }

  abortRedirect() {
    this.userDispatch({ type: 'reset' });
    this.resultsDispatch({ type: 'reset' });

    return <Redirect to={routes.HOME} />;
  }

  toExperiment(experimentNumber: number) {
    this.history.replace(
      `${routes.EXPERIMENT_INTRODUCTION}/Practice/${experimentNumber}`
    );
  }

  startPractice() {
    const experimentNumber = this.getExperimentNumber();
    this.history.replace(
      `${routes.EXPERIMENT_CONTAINER}/Practice/${experimentNumber}`
    );
  }

  startStimuli() {
    const experimentNumber = this.getExperimentNumber();
    this.history.replace(
      `${routes.EXPERIMENT_CONTAINER}/Stimuli/${experimentNumber}`
    );
  }

  getExperimentNumber(): number {
    return parseInt(this.history.location.pathname.slice(-1), 10);
  }

  isPractice(): boolean {
    return this.history.location.pathname.includes('Practice');
  }

  experimentsRunning(): boolean {
    return this.history.location.pathname.includes('experiment');
  }
}
