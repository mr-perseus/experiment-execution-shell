import React from 'react';
import * as MouseTrap from 'mousetrap';
import type {
  ExperimentConfig,
  KeyBindingConfig,
  StepConfig,
  SubStepConfig
} from '../utils/configTypes';
import {
  useExperimentResultsDispatch,
  useExperimentResultsState
} from '../utils/experimentResultsContext';
import { CurrentExperimentContext } from '../utils/experimentSubContexts';
import ExperimentSubStep from '../components/experiments/ExperimentSubStep';

const unbindKeys = (keyBindings: KeyBindingConfig[]) => {
  const keys = keyBindings.map(binding => binding.key);
  MouseTrap.unbind(keys);
};

export default ({
  subStep,
  step,
  onComplete
}: {
  subStep: SubStepConfig,
  step: StepConfig,
  onComplete: () => void
}) => {
  const resultDispatch = useExperimentResultsDispatch();
  const results = useExperimentResultsState();
  const experimentConfig: ExperimentConfig = React.useContext(
    CurrentExperimentContext
  );

  React.useEffect(() => {
    if (subStep.waitForSpaceOrEnter) {
      MouseTrap.bind(['space', 'enter'], () => {
        MouseTrap.unbind(['space', 'enter']);
        onComplete();
      });
    }
  }, [subStep]);

  React.useEffect(() => {
    if (!subStep.time) {
      return () => {};
    }
    let timer;
    const startTime = Date.now();
    if (subStep.bindKeys) {
      experimentConfig.keyBindings.forEach(({ key, answerId }) => {
        MouseTrap.bind(key, () => {
          unbindKeys(experimentConfig.keyBindings);
          resultDispatch({
            type: 'push',
            payload: { key, answerId, step, time: Date.now() - startTime }
          });
          if (subStep.triggerNext) {
            clearTimeout(timer);
            onComplete();
          }
        });
      });
    }

    timer = setTimeout(() => {
      if (subStep.bindKeys) {
        unbindKeys(experimentConfig.keyBindings);
        resultDispatch({ type: 'push', payload: { step } });
      }
      onComplete();
    }, subStep.time);

    return () => clearTimeout(timer);
  }, [subStep]);

  if (subStep.conditionsOnResult) {
    const lastResult = results.find(result => result.step === step);
    if (!subStep.conditionsOnResult.includes(lastResult.result)) {
      onComplete();
      return <></>;
    }
  }

  return (
    <>
      <PressKeyMessage subStep={subStep} />
      <ExperimentSubStep subStep={subStep} step={step} />
    </>
  );
};

const PressKeyMessage = ({ subStep }: { subStep: SubStepConfig }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '98vw',
        textAlign: 'center',
        padding: '5px',
        boxSizing: 'border-box',
        display: subStep.waitForSpaceOrEnter ? '' : 'none'
      }}
    >
      Press Space or Enter to continue
    </div>
  );
};
