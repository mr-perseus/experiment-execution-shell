import type { ExperimentResultType } from './types';

export type ExperimentConfig = {
  name: string,
  groupName?: string,
  introduction: string,
  introductionImage?: string,
  keyBindingInstructions: string,
  keyBindings: KeyBindingConfig[],
  subSteps: { [string]: SubStepConfig },
  stimuliConfig: ExperimentPartConfig,
  practiceConfig: ExperimentPartConfig
};

export type KeyBindingConfig = {
  answerId: number,
  key: string
};

export type SubStepConfig = {
  id: string,
  type: string,
  stepIncludes?: StepIncludes,
  displayAnswer?: boolean,
  bindKeys?: boolean,
  triggerNext?: boolean,

  waitForSpaceOrEnter?: boolean,
  conditionsOnResult?: string[],

  time?: number,
  timeBetweenSounds?: number,

  // the following fields are included from the Image Type Include and not availabe from the json config directly
  imagePath?: string,
  correctAnswer?: number
};

export type ExperimentPartConfig = {
  name: string,
  dataPath: string,
  subStepRefs: string[],
  steps: StepConfig[]
};

export type StepConfig = {
  [string]: {},
  correctAnswer: number,
  experimentGroupName?: string,
  experimentName?: string,
  experimentPartName?: string
};

type StepIncludes = {
  imagePath?: string,
  soundPaths?: string[],
  correctAnswer?: number
};

export type ExperimentStepResult = {
  step: StepConfig,
  result: ExperimentResultType,
  resultAnswer: number,
  resultKey: string,
  time: number
};
