import React from 'react';
import userReducer from './userReducer';
import { User } from './types';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

const UserProvider = ({ children }: { children: string }) => {
  const [user, dispatch] = React.useReducer(userReducer, new User());
  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

const useUserState = () => {
  return React.useContext(UserStateContext);
};

const useUserDispatch = () => {
  return React.useContext(UserDispatchContext);
};

export { UserProvider, useUserState, useUserDispatch };
