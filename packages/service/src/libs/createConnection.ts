export function createConnection<E>(items: E[], { first, last, cursor }) {
  return {
    hasNextPage: false,
    hasPreviousPage: false,
    edges: items.map((item) => ({ node: item })),
    startCursor: 'XXX',
    endCursor: 'XXX',
  };
}
