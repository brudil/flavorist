import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import Helmet from 'react-helmet';
import { isRedirect } from '@reach/router';

const ViewCrashErrorBoundaryContent = () => {
  return (
    <div css={{ textAlign: 'center', padding: '2rem' }}>
      <Helmet title="Error" />
      <h2>This can't be displayed right now</h2>
      <p>Apologies about this</p>
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

export const ViewCrashErrorBoundary: React.FC = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ViewCrashErrorBoundaryContent}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  );
};
