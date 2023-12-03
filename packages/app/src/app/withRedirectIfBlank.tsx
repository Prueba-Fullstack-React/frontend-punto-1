/* eslint-disable react/function-component-definition */
import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line max-len
export const withRedirectIfBlank =
  <T extends object>(config: {
    redirectCondition: (arg0: T) => boolean;
    redirectTo: string;
  }) =>
  (Component: React.FC<T>) =>
  // eslint-disable-next-line react/display-name
  (props: T) => {
    const { redirectCondition, redirectTo } = config;

    if (redirectCondition(props)) {
      return <Navigate replace to={redirectTo} />;
    }

    return <Component {...props} />;
  };
