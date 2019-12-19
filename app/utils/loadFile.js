import path from 'path';
import fs from 'fs';
import resourcePath from './resourcePath';

const loadFile = <T>(configFileName: string): T => {
  const experimentDataPath = path.join(
    resourcePath,
    'experiments',
    'config',
    configFileName
  );

  const rawExperimentData = fs.readFileSync(experimentDataPath);
  return JSON.parse(rawExperimentData.toString());
};

export default loadFile;
