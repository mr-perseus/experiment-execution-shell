import { ExperimentResult } from './types';
import type { ExperimentStepResult } from './configTypes';

const newResult: ExperimentStepResult = (time, answerId, key, step) => {
  if (!answerId) {
    return {
      step,
      result: ExperimentResult.Unanswered,
      resultAnswer: null,
      resultKey: null,
      time: 0
    };
  }

  if (step.correctAnswer === answerId) {
    return {
      step,
      result: ExperimentResult.Correct,
      resultAnswer: answerId,
      resultKey: key,
      time
    };
  }

  return {
    step,
    result: ExperimentResult.Incorrect,
    resultAnswer: answerId,
    resultKey: key,
    time
  };
};

function processResult(experimentResults, action) {
  const { time, answerId, key, step } = action.payload;

  const alreadyExistingStepResults = experimentResults.filter(
    entry => entry.step === step
  );
  const alreadyExistingSteps = alreadyExistingStepResults.map(
    entry => entry.step
  );
  if (
    alreadyExistingStepResults.length === 0 ||
    alreadyExistingStepResults.every(
      entry => entry.result === ExperimentResult.Unanswered
    )
  ) {
    return [
      ...experimentResults.filter(
        entry => !alreadyExistingSteps.includes(entry.step)
      ),
      newResult(time, answerId, key, step)
    ];
  }

  return experimentResults;
}

function resetCurrent(
  experimentResults: ExperimentStepResult[],
  groupName: string,
  name: string,
  partName: string
) {
  return experimentResults.filter(
    (experimentResult: ExperimentStepResult) =>
      !(
        experimentResult.step.experimentGroupName === groupName &&
        experimentResult.step.experimentName === name &&
        experimentResult.step.experimentPartName === partName
      )
  );
}

export default (experimentResults, action) => {
  switch (action.type) {
    case 'push':
      return processResult(experimentResults, action);
    case 'reset':
      return [];
    case 'resetCurrent':
      return resetCurrent(
        experimentResults,
        action.groupName,
        action.name,
        action.partName
      );
    default:
      return experimentResults;
  }
};
