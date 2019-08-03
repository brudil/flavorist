import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import Helmet from 'react-helmet';
import { isRedirect } from '@reach/router';

const AppCrashErrorBoundaryContent = () => {
  return (
    <div css={{ textAlign: 'center', padding: '2rem' }}>
      <Helmet title="Error" />
      <h2>Something went wrong!</h2>
    </div>
  );
};

function onError(error: Error) {
  if (isRedirect(error)) {
    throw error;
  } else {
    // do whatever you were going to do
  }
}

export const AppCrashErrorBoundary: React.FC = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={AppCrashErrorBoundaryContent}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  );
};
