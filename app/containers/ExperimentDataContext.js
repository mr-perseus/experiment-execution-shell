// @flow
import React, { createContext, useContext } from 'react';
import { useConfigState } from '../utils/configContext';
import loadFile from '../utils/loadFile';
import type {
  ExperimentConfig,
  ExperimentPartConfig,
  StepConfig
} from '../utils/configTypes';

const ExperimentDataContext: React$Context<ExperimentConfig[]> = createContext(
  []
);

const addNamesToStep = (
  groupName: string,
  name: string,
  partConfig: ExperimentPartConfig
) => {
  partConfig.steps.forEach((step: StepConfig) => {
    /* eslint-disable no-param-reassign */
    step.experimentGroupName = groupName || name;
    step.experimentName = name;
    step.experimentPartName = partConfig.name;
    /* eslint-enable no-param-reassign */
  });
};

export const useExperimentData = (): ExperimentConfig[] =>
  useContext(ExperimentDataContext);

export default ({ children }: { children: React$Node }) => {
  const config = useConfigState();

  const experimentConfigs = loadFile<string[]>('experiments.json')
    .map(experimentName => loadFile<ExperimentConfig>(experimentName))
    .map((experimentConfig): ExperimentConfig => {
      addNamesToStep(
        experimentConfig.groupName,
        experimentConfig.name,
        experimentConfig.practiceConfig
      );
      addNamesToStep(
        experimentConfig.groupName,
        experimentConfig.name,
        experimentConfig.stimuliConfig
      );
      const customConfig = config.find(
        ({ name }) => name === experimentConfig.name
      );
      if (customConfig) {
        return {
          ...experimentConfig,
          ...{ keyBindings: customConfig.keyBindings }
        };
      }
      return experimentConfig;
    });

  return (
    <ExperimentDataContext.Provider value={experimentConfigs}>
      {children}
    </ExperimentDataContext.Provider>
  );
};
