import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { Link } from '@reach/router';
import { COLORS } from '../style/constants';
import Logotype from '../vectors/logotype.svg';
import { SidebarProfile } from './SidebarProfile';
import { SidebarContainer } from './SidebarContainer';
import { auth } from '../context/authentication';

const Section: React.FC = ({ children }) => (
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

const MenuItem: React.FC<{ href: string }> = ({ children, href }) => (
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

export const Sidebar: React.FC = () => {
  const authData = useContext(auth);

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
          <MenuItem href="/explore/recipes">Recipes</MenuItem>
          <MenuItem href="/explore/ingredients">Ingredients</MenuItem>
          <MenuItem href="/explore/users">Flavorists</MenuItem>
          {authData.user !== null && (
            <React.Fragment>
              <Section>My</Section>
              <MenuItem href="/recipes">Recipes</MenuItem>
              <MenuItem href="/inventory">Inventory</MenuItem>
              <MenuItem href="/favorites">Favorites</MenuItem>
              <MenuItem href="/batches">Mixes</MenuItem>
              <MenuItem href="/recipes/suggested">Suggestions</MenuItem>
            </React.Fragment>
          )}
        </ul>
      </SidebarContainer>

      {!authData.isLoading && <SidebarProfile />}
    </div>
  );
};
