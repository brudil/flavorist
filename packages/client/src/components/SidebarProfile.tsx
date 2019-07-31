import React from 'react';
import { COLORS } from '../style/constants';
import { SidebarContainer } from './SidebarContainer';

export const SidebarProfile: React.FC = () => {
  return (
    <div
      css={{
        background: COLORS.AccentLight,
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: 220,
      }}
    >
      <SidebarContainer>
        <img
          css={{
            borderRadius: '50%',
          }}
          width={28}
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          alt="Profile of James"
        />
        <span
          css={{
            fontSize: '1.1rem',
            fontWeight: 600,
          }}
        >
          James Canning
        </span>
      </SidebarContainer>
    </div>
  );
};
