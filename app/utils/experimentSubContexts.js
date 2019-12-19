// @flow
/* eslint-disable flowtype/no-weak-types */
import React from 'react';
import type { ExperimentConfig, ExperimentPartConfig } from './configTypes';

export const CurrentExperimentContext: React$Context<ExperimentConfig> = (React.createContext(): any);
export const CurrentExperimentPartContext: React$Context<ExperimentPartConfig> = (React.createContext(): any);
