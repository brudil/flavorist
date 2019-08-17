import React from 'react';
import { Link } from '@reach/router';
import { css } from '@emotion/core';

export const SidebarMenuItem: React.FC<{ href: string }> = ({
  children,
  href,
}) => (
  <li>
    <Link
      css={css`
        display: block;
        font-size: 1.3rem;
        padding: 0.2rem 0;
        color: #ecebee;
        font-weight: 600;
        text-decoration: none;
      `}
      to={href}
    >
      {children}
    </Link>
  </li>
);
