import { emailAddressTypePolicy } from './policies/EmailAddress';
import { instantTypePolicy } from './policies/Instant';

export const scalarTypePolicies = {
  Entity1: { fields: { created: instantTypePolicy } },
  Entity2: { fields: { created: instantTypePolicy } },
  Validate: { fields: { emailAddress: emailAddressTypePolicy } },
};
