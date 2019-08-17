import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { Link } from '@reach/router';
import { COLORS } from '../../style/constants';
import Logotype from '../../vectors/logotype.svg';
import { SidebarProfile } from './SidebarProfile';
import { SidebarContainer } from './SidebarContainer';
import { auth } from '../../context/authentication';
import { SidebarSection } from './SidebarSection';
import { SidebarMenuItem } from './SidebarMenuItem';

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
          <SidebarMenuItem href="/new">New</SidebarMenuItem>
          <SidebarSection>Explore</SidebarSection>
          <SidebarMenuItem href="/recipes">Recipes</SidebarMenuItem>
          <SidebarMenuItem href="/ingredients">Ingredients</SidebarMenuItem>
          <SidebarMenuItem href="/users">Flavorists</SidebarMenuItem>
          {authData.user !== null && (
            <React.Fragment>
              <SidebarSection>My</SidebarSection>
              <SidebarMenuItem href="/recipes">Recipes</SidebarMenuItem>
              <SidebarMenuItem href="/inventory">Inventory</SidebarMenuItem>
              <SidebarMenuItem href="/favorites">Favorites</SidebarMenuItem>
              <SidebarMenuItem href="/batches">Mixes</SidebarMenuItem>
              <SidebarMenuItem href="/recipes/suggested">
                Suggestions
              </SidebarMenuItem>
              <SidebarMenuItem href="/teams">Teams</SidebarMenuItem>
            </React.Fragment>
          )}
        </ul>
      </SidebarContainer>

      {!authData.isLoading && <SidebarProfile />}
    </div>
  );
};
