import React from 'react';
import ErrorBoundary from 'react-error-boundary';

const AppCrashErrorBoundaryContent = () => {
  return (
    <div css={{ textAlign: 'center', padding: '2rem' }}>
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
