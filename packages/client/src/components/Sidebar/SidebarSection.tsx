import React from 'react';
import { css } from '@emotion/core';

export const SidebarSection: React.FC = ({ children }) => (
  <li
    css={css`
      font-size: 13px;
      text-transform: uppercase;
      color: #dfdee1;
      font-weight: 600;
      margin-top: 2rem;
    `}
  >
    {children}
  </li>
);
