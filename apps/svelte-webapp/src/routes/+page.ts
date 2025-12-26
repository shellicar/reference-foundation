// // since there's no dynamic data here, we can prerender

import { ApolloError } from '@apollo/client/errors';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { Validate } from './requests';

// // it so that it gets served as a static asset in production
// export const prerender = false;

// export const load = async () => {
//   console.log("Loading page...");
//   // const response = await Validate("1");
//   console.log("Response from Validate:", response);
//   return {};
// };

export const load = async () => {
  if (browser) {
    console.log('Loading page...');
    try {
      const response = await Validate('1');
      if (response.data.entity1?.__typename === 'Entity1') {
        console.log('Response from Validate:', response.data.entity1);
        return {
          entity1: response.data.entity1,
        };
      }
      return {
        entity1: null,
      };
    } catch (err) {
      if (err instanceof ApolloError) {
        error(400, err.message);
      }
    }
  }
  return {};
};
