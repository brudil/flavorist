import React from 'react';
import Downshift from 'downshift';
import { useQuery } from '@apollo/react-hooks';
import { searchIngredientsForUser } from '../graphql/queries/ingredients/searchIngredientsForUser';
import { SearchIngredientsForUserQuery } from '../generated/graphql';

const FlavorGetter: React.FC<any> = ({
  inputValue,
  selectedItem,
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
              style: {
                backgroundColor:
                  highlightedIndex === index ? 'lightgray' : 'white',
                fontWeight: selectedItem === item ? 'bold' : 'normal',
              },
            })}
          >
            {item!.name}
          </li>
        ))}
    </React.Fragment>
  );
};

export const IngredientSelector: React.FC<{
  onAdd: (props: { id: string }) => void;
}> = ({ onAdd }) => {
  return (
    <div>
      <Downshift
        onChange={onAdd}
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
            <label {...getLabelProps()}>ADD: </label>
            <input {...getInputProps()} />
            <ul {...getMenuProps()}>
              {isOpen ? (
                <FlavorGetter
                  {...{
                    inputValue,
                    selectedItem,
                    highlightedIndex,
                    getItemProps,
                  }}
                />
              ) : null}
            </ul>
          </div>
        )}
      </Downshift>
    </div>
  );
};
