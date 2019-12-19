import path from 'path';
import { remote } from 'electron';

const toExport = {};
if (process.env.NODE_ENV === 'development') {
  toExport.resourcePath = path.resolve(
    remote.app.getAppPath(),
    '..',
    'resources'
  );
} else if (process.env.NODE_ENV === 'test') {
  toExport.resourcePath = path.resolve(
    __dirname,
    '..',
    '..',
    'test',
    'resources'
  );
} else if (process.env.RESOURCE_ENV !== 'local') {
  toExport.resourcePath = path.resolve(remote.app.getAppPath(), 'resources');
} else {
  toExport.resourcePath = path.resolve(
    remote.app.getAppPath(),
    '..',
    'resources'
  );
}

export default toExport.resourcePath;
