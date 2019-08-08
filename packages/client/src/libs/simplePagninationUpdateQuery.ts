import { FetchMoreOptions } from 'apollo-client';

export const paginationVariables = (cursor: string) => {
  return {
    cursor: cursor,
  };
};

export const paginationUpdateQuery = (
  queryName: string,
): FetchMoreOptions['updateQuery'] => (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) return previousResult;

  console.log(previousResult, fetchMoreResult);

  const newEdges = fetchMoreResult[queryName].edges;
  const pageInfo = fetchMoreResult[queryName].pageInfo;

  return newEdges.length
    ? {
        // Put the new comments at the end of the list and update `pageInfo`
        // so we have the new `endCursor` and `hasNextPage` values
        [queryName]: {
          __typename: previousResult[queryName].__typename,
          edges: [...previousResult[queryName].edges, ...newEdges],
          pageInfo,
        },
      }
    : previousResult;
};

export const paginationFetchMore = (
  queryName: string,
  cursor?: string | null,
) => ({
  variables: paginationVariables(cursor || ''), // this isn't good but we should short circuit
  updateQuery: paginationUpdateQuery(queryName),
});
