import React from 'react';
import electron from 'electron';
import path from 'path';
import fs from 'fs';
import { debug } from 'electron-log';
import type { KeyBindingConfig } from './configTypes';

const ConfigStateContext = React.createContext();
const ConfigDispatchContext = React.createContext(
  () => new Error('Config Context not initialized!')
);

const userPath = (electron.remote.app || electron.app).getAppPath('userData');
const configPath = path.join(userPath, 'keybindings.json');

function loadConfig() {
  if (fs.existsSync(configPath)) {
    const buffer = fs.readFileSync(configPath);
    if (buffer.length > 0) {
      return JSON.parse(buffer.toString());
    }
  }

  debug('No config found, config path', configPath);
  return [];
}

const saveConfig = config => {
  fs.writeFileSync(configPath, JSON.stringify(config));
};

const ConfigProvider = ({ children }: { children: string }) => {
  const savedConfig = loadConfig();

  const [config, dispatch] = React.useReducer((prevConfig, action) => {
    if (action.type === 'save') {
      saveConfig(action.data);
      return [...action.data];
    }
    return prevConfig;
  }, savedConfig);

  return (
    <ConfigStateContext.Provider value={config}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigStateContext.Provider>
  );
};

const useConfigState = (): [
  { name: string, keyBindings: KeyBindingConfig[] }
] => {
  return React.useContext(ConfigStateContext);
};

const useConfigDispatch = (): (({
  type: ['save'],
  data: [{ name: string, keyBindings: KeyBindingConfig[] }]
}) => void) => {
  return React.useContext(ConfigDispatchContext);
};

export { ConfigProvider, useConfigState, useConfigDispatch };
