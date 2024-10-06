import versionJson from '../../../../../version.json';

export const resolvers = {
  Query: {
    version: () => {
      return versionJson;
    }
  },
};
