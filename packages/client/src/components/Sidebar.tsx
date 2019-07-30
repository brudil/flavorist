import React from 'react';
import { css } from '@emotion/core';
import { Link } from '@reach/router';

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
        font-size: 17px;
        padding: 0.25rem 0;
        color: #fff;
      `}
      to={href}
    >
      {children}
    </Link>
  </li>
);

export const Sidebar: React.FC<{ logoSrc: string }> = ({ logoSrc }) => {
  return (
    <div
      css={css`
        height: 100vh;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 220px;
        background-color: #1e2736;
        color: #fff;
        padding: 0.8rem;
      `}
    >
      <Link to="/">
        <h2>
          <img width={22} src={logoSrc} /> Flavorist
        </h2>
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
    </div>
  );
};
