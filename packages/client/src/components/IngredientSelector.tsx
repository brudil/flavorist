import React, { useState } from 'react';
import Downshift from 'downshift';
import { useQuery } from '@apollo/react-hooks';
import { searchIngredientsForUser } from '../graphql/queries/ingredients/searchIngredientsForUser';
import { SearchIngredientsForUserQuery } from '../generated/graphql';
import { type, TypeSize } from '../style/type';
import VisuallyHidden from '@reach/visually-hidden';

const FlavorGetter: React.FC<any> = ({
  inputValue,
  highlightedIndex,
  getItemProps,
}) => {
  const { data } = useQuery<SearchIngredientsForUserQuery>(
    searchIngredientsForUser,
    { variables: { query: inputValue } },
  );

  const items =
    inputValue === ''
      ? []
      : !data || !data.searchIngredients
      ? []
      : data.searchIngredients.edges.map((edge) => edge!.node) || [];

  return (
    <React.Fragment>
      {items
        //.filter(item => !inputValue || item!.name!.includes(inputValue))
        .map((item, index) => (
          <li
            {...getItemProps({
              key: item!.id,
              index,
              item,
            })}
            css={{
              background: highlightedIndex === index ? '#eee' : 'white',
              padding: '0.6rem',
              width: '100%',
            }}
          >
            <span
              css={{ width: 60, display: 'inline-block', paddingRight: '1rem' }}
            >
              {item!.vendor!.shortName}
            </span>
            <span>{item!.name}</span>
          </li>
        ))}
    </React.Fragment>
  );
};

export const IngredientSelector: React.FC<{
  onAdd: (props: { id: string }) => void;
}> = ({ onAdd }) => {
  const [state, setState] = useState({ inputValue: '' });

  return (
    <div css={{ position: 'relative' }}>
      <Downshift
        onChange={(id) => {
          setState({ inputValue: '' });
          onAdd(id);
        }}
        onStateChange={({ inputValue }) => {
          if (inputValue !== undefined) {
            setState({ inputValue: inputValue || '' });
          }
        }}
        inputValue={state.inputValue}
        itemToString={(item) => (item ? item.value : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div>
            <label {...getLabelProps()}>
              <VisuallyHidden>Find a flavor</VisuallyHidden>
            </label>
            <input
              {...getInputProps()}
              placeholder="Find a flavor"
              css={{
                padding: '0.5rem',
                width: '100%',
                boxSizing: 'border-box',
                ...type(TypeSize.GreatPrimer),
              }}
            />
            {isOpen ? (
              <ul
                {...getMenuProps()}
                css={{
                  margin: 0,
                  position: 'absolute',
                  width: '100%',
                  padding: '0',
                  boxSizing: 'border-box',
                  listStyle: 'none',
                  background: '#fff',
                  boxShadow: '0 8px 10px rgba(30, 30, 30, 0.1)',
                }}
              >
                <FlavorGetter
                  {...{
                    inputValue,
                    selectedItem,
                    highlightedIndex,
                    getItemProps,
                  }}
                />
              </ul>
            ) : null}
          </div>
        )}
      </Downshift>
    </div>
  );
};
