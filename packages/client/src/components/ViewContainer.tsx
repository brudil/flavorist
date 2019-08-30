import React from 'react';

export const ViewContainer: React.FC<{}> = ({ children }) => {
  return <div css={{ padding: '1rem' }}>{children}</div>;
};
