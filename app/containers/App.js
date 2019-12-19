// @flow
import * as React from 'react';
import { Validator } from 'jsonschema';
import { UserProvider } from '../utils/userContext';
import { ConfigProvider } from '../utils/configContext';
import ExperimentDataContext from './ExperimentDataContext';
import { ExperimentResultsProvider } from '../utils/experimentResultsContext';
import ExperimentNavigationContext from './ExperimentNavigationContext';
import EscapeContainer from './EscapeContainer';
import loadFile from '../utils/loadFile';
import experimentSchema from '../constants/experimentConfigSchema';

export default ({ children }: { children: React.Node }) => {
  const experiments: string[] = loadFile('experiments.json');

  const validator = new Validator();
  for (const experiment of experiments) {
    const experimentConfig = loadFile(experiment);
    const validationResult = validator.validate(
      experimentConfig,
      experimentSchema
    );
    if (!validationResult.valid) {
      return (
        <>
          Experiment {experiment} is not valid: {validationResult.toString()}
        </>
      );
    }
  }

  return (
    <UserProvider>
      <ConfigProvider>
        <ExperimentDataContext>
          <ExperimentResultsProvider>
            <ExperimentNavigationContext>
              <EscapeContainer>{children}</EscapeContainer>
            </ExperimentNavigationContext>
          </ExperimentResultsProvider>
        </ExperimentDataContext>
      </ConfigProvider>
    </UserProvider>
  );
};
