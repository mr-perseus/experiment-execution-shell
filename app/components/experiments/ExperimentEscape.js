/* eslint-disable jsx-a11y/click-events-have-key-events */
// this already works with tabs & enter...
// flow sucks!
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ExperimentNavigation,
  useExperimentNavigation
} from '../../containers/ExperimentNavigationContext';
import { useExperimentData } from '../../containers/ExperimentDataContext';
import type { ExperimentConfig } from '../../utils/configTypes';

type MappedExperiment = {
  index: number,
  experiment: ExperimentConfig
};

type MappedExperimentGroup = {
  groupName: string,
  isGroup: boolean,
  experiments: MappedExperiment[]
};

const groupExperiments = (experiments: ExperimentConfig[]) =>
  experiments.reduce((grouped, experiment, index) => {
    if (!experiment.groupName) {
      grouped.push({ index, experiment });
      return grouped;
    }
    let parentGroup = grouped.find(
      item => item.groupName === experiment.groupName
    );

    if (!parentGroup) {
      parentGroup = {
        experiments: [],
        groupName: experiment.groupName,
        isGroup: true
      };
      grouped.push(parentGroup);
    }
    parentGroup.experiments.push({ index, experiment });

    return grouped;
  }, []);

export default () => {
  const experiments: ExperimentConfig[] = useExperimentData();
  const experimentNavigation = useExperimentNavigation();
  const { t } = useTranslation();

  const [completed, setCompleted] = useState(false);
  const [aborted, setAborted] = useState(false);

  if (completed) {
    return ExperimentNavigation.completionRedirect();
  }

  if (aborted) {
    return experimentNavigation.abortRedirect();
  }

  const experimentsRunning = experimentNavigation.experimentsRunning();

  const groupedExperiments = groupExperiments(experiments);

  return (
    <>
      <ul>
        <li>
          <h1>Go To</h1>
        </li>
        <li>
          <a tabIndex={0} role="link" onClick={() => setCompleted(true)}>
            Completion Page
          </a>
        </li>
        <li>
          <a tabIndex={0} role="link" onClick={() => setAborted(true)}>
            Home {experimentsRunning ? t('Buttons.AbortTest') : ''}
          </a>
        </li>
        <li>
          <h3>Tests</h3>
        </li>
        {groupedExperiments.map(item => {
          return <ExperimentItem item={item} />;
        })}
      </ul>
    </>
  );
};

const ExperimentItem = ({
  item
}: {
  item: MappedExperiment | MappedExperimentGroup
}) => {
  if (item.isGroup) {
    return (
      <div key={item.groupName}>
        <ExperimentGroup experimentGroup={item} />
      </div>
    );
  }

  return <ToExperiment key={item.experiment.name} experiment={item} />;
};

const ExperimentGroup = ({
  experimentGroup
}: {
  experimentGroup: { groupName: string, experiments: [] }
}) => {
  return (
    <>
      <li>
        <h5>{experimentGroup.groupName}</h5>
      </li>
      {experimentGroup.experiments.map(experiment => (
        <ToExperiment
          key={experiment.experiment.name}
          experiment={experiment}
        />
      ))}
    </>
  );
};

const ToExperiment = ({
  experiment
}: {
  experiment: { index: number, experiment: ExperimentConfig }
}) => {
  const experimentNavigation = useExperimentNavigation();

  return (
    <li>
      <a
        tabIndex={0}
        role="link"
        onClick={() => experimentNavigation.toExperiment(experiment.index)}
      >
        {experiment.experiment.name}
      </a>
    </li>
  );
};
