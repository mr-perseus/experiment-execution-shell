import { User } from './types';

export default (user, action) => {
  switch (action.type) {
    case 'change':
      return { ...user, ...action.payload };
    case 'reset':
      return new User();
    default:
      return user;
  }
};
