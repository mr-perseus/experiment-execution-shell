// @flow
import React, { useState } from 'react';
import ExperimentSubStepContainer from '../../containers/ExperimentSubStepContainer';
import type { StepConfig, SubStepConfig } from '../../utils/configTypes';

export default ({
  onComplete,
  step,
  subSteps
}: {
  onComplete: () => void,
  step: StepConfig,
  subSteps: SubStepConfig[]
}) => {
  const [subStepIndex, setSubStepIndex] = useState(0);

  if (subStepIndex >= subSteps.length) {
    onComplete();
    setSubStepIndex(0);
    return <>waiting for next step</>;
  }

  const subStep = subSteps[subStepIndex];

  const handleSubStepComplete = () => {
    setSubStepIndex(prevIndex => prevIndex + 1);
  };

  return (
    <>
      <ExperimentSubStepContainer
        onComplete={handleSubStepComplete}
        subStep={subStep}
        step={step}
      />
    </>
  );
};
