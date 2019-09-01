import React from 'react';
import { type, TypeSize } from '../style/type';

export const IngredientTable: React.FC<React.HTMLProps<HTMLTableElement>> = ({
  children,
  ...props
}) => {
  return (
    <table
      {...props}
      css={{
        width: '100%',
        borderCollapse: 'collapse',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {children}
    </table>
  );
};

export const IngredientTableRow: React.FC<
  React.HTMLProps<HTMLTableRowElement>
> = ({ children, ...props }) => {
  return (
    <tr
      {...props}
      css={{
        backgroundColor: '#fafafa',
        marginBottom: '0.3rem',
        borderBottom: '6px #fff solid',
      }}
    >
      {children}
    </tr>
  );
};

export enum IngredientInventoryStatus {
  Available,
  RunningLow,
  Absent,
  Header,
}

const inventoryStatusColorMap = {
  [IngredientInventoryStatus.Available]: '#22ff22',
  [IngredientInventoryStatus.RunningLow]: '#ffb125',
  [IngredientInventoryStatus.Absent]: '#ff3526',
  [IngredientInventoryStatus.Header]: 'transparent',
};

export const IngredientTableIndicator: React.FC<{
  ingredientStatus: IngredientInventoryStatus;
}> = ({ ingredientStatus }) => {
  return (
    <td
      css={{
        width: 3,
        background: inventoryStatusColorMap[ingredientStatus],
      }}
    />
  );
};

export const IngredientTableCell: React.FC<
  React.HTMLProps<HTMLTableCellElement>
> = ({ children, ...props }) => {
  return (
    <td
      {...props}
      css={{
        padding: '0.5rem',
        fontWeight: 600,
        ...type(TypeSize.Pica),
        '& a': {
          color: '#333',
          textDecoration: 'none',
        },
      }}
    >
      {children}
    </td>
  );
};
