// noinspection JSUnusedGlobalSymbols
export default {
  // because is used in package.json under the jest file mock mapping...
  remote: {
    app: {
      // eslint-disable-next-line
      getAppPath: jest.fn().mockReturnValue('nothing of value')
    }
  }
};
