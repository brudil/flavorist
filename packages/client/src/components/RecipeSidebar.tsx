import React from 'react';
import { RecipeRevision } from '../generated/graphql';
import ShakeNVapeIcon from '../vectors/icons/snv.svg';
import ClockIcon from '../vectors/icons/clock.svg';
import VgIcon from '../vectors/icons/vg.svg';

const IconWrapper: React.FC = ({ children }) => (
  <span
    css={{
      width: 24,
      height: 24,
      display: 'inline-block',
      marginRight: '0.5rem',
      '& svg': { width: '100%' },
    }}
  >
    {children}
  </span>
);

export const RecipeSidebar: React.FC<{ recipeRevision: RecipeRevision }> = ({
  recipeRevision,
}) => {
  return (
    <React.Fragment>
      <div>
        <button>Copy</button>
        <button>Mix</button>
        <button>Favorite</button>
      </div>
      Creator Suggestions
      <ul css={{ padding: 0, margin: 0, listStyle: 'none' }}>
        {recipeRevision.shakeAndVapable ? (
          <li>
            <IconWrapper>
              <ShakeNVapeIcon />
            </IconWrapper>
            Shake 'n Vape
          </li>
        ) : null}
        {recipeRevision.suggestedSteepHours ? (
          <li>
            <IconWrapper>
              <ClockIcon />
            </IconWrapper>
            {Math.ceil(recipeRevision.suggestedSteepHours / 2.4) / 10} day steep
          </li>
        ) : null}
        {recipeRevision.suggestedVg ? (
          <li>
            <IconWrapper>
              <VgIcon />
            </IconWrapper>
            {recipeRevision.suggestedVg * 100}%
          </li>
        ) : null}
      </ul>
    </React.Fragment>
  );
};
