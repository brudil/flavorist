import React from 'react';

export const SidebarContainer: React.FC = ({ children }) => (
  <div
    css={{
      padding: '0.8rem',
    }}
  >
    {children}
  </div>
);
