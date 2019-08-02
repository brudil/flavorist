import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import Helmet from 'react-helmet';

const AppCrashErrorBoundaryContent = () => {
  return (
    <div css={{ textAlign: 'center', padding: '2rem' }}>
      <Helmet title="Error" />
      <h2>Something went wrong!</h2>
    </div>
  );
};

export const AppCrashErrorBoundary: React.FC = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={AppCrashErrorBoundaryContent}>
      {children}
    </ErrorBoundary>
  );
};
