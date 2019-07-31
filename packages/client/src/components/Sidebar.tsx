import React from 'react';
import { css } from '@emotion/core';
import { Link } from '@reach/router';
import { COLORS } from '../style/constants';
import Logotype from '../vectors/logotype.svg';
import { SidebarProfile } from './SidebarProfile';
import { SidebarContainer } from './SidebarContainer';

const Section: React.FC = ({ children }) => (
  <li
    css={css`
      font-size: 13px;
      text-transform: uppercase;
      color: #ccc;
      margin-top: 2rem;
      font-weight: 500;
    `}
  >
    {children}
  </li>
);

const MenuItem: React.FC<{ href: string }> = ({ children, href }) => (
  <li>
    <Link
      css={css`
        display: block;
        font-size: 1.3rem;
        padding: 0.2rem 0;
        color: #fff;
        font-weight: 600;
        text-decoration: none;
      `}
      to={href}
    >
      {children}
    </Link>
  </li>
);

export const Sidebar: React.FC = () => {
  return (
    <div
      css={css`
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 220px;
        background-color: ${COLORS.AccentBackground};
        color: #fff;
      `}
    >
      <SidebarContainer>
        <Link to="/">
          <Logotype />
        </Link>

        <ul
          css={css`
            list-style: none;
            padding: 0;
            margin: 0;
          `}
        >
          <Section>Explore</Section>
          <MenuItem href="/recipes">Recipes</MenuItem>
          <MenuItem href="/ingredients">Ingredients</MenuItem>
          <MenuItem href="/users">Flavorists</MenuItem>
          <Section>My</Section>
          <MenuItem href="/recipes?owner=both">Recipes</MenuItem>
          <MenuItem href="/my/flavors">Inventory</MenuItem>
          <MenuItem href="/my/favorites">Favorites</MenuItem>
          <MenuItem href="/my/batches">Mixes</MenuItem>
          <MenuItem href="/recipes?suggestions=1">Suggestions</MenuItem>
        </ul>
      </SidebarContainer>

      <SidebarProfile />
    </div>
  );
};
