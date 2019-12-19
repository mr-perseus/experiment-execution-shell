import React from 'react';
import experimentResultsReducer from './experimentResultsReducer';

const ExperimentResultsStateContext = React.createContext();
const ExperimentResultsDispatchContext = React.createContext();

const ExperimentResultsProvider = ({ children }: { children: string }) => {
  const [experimentResults, dispatch] = React.useReducer(
    experimentResultsReducer,
    []
  );
  return (
    <ExperimentResultsStateContext.Provider value={experimentResults}>
      <ExperimentResultsDispatchContext.Provider value={dispatch}>
        {children}
      </ExperimentResultsDispatchContext.Provider>
    </ExperimentResultsStateContext.Provider>
  );
};

const useExperimentResultsState = () => {
  return React.useContext(ExperimentResultsStateContext);
};

const useExperimentResultsDispatch = () => {
  return React.useContext(ExperimentResultsDispatchContext);
};

export {
  ExperimentResultsProvider,
  useExperimentResultsState,
  useExperimentResultsDispatch
};
