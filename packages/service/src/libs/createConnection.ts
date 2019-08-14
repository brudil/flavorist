import { decode, encode } from './base64';

interface ConnectionArgs {
  cursor?: string | null;
  first?: number | null;
  last?: number | null;
}

const encodeCursor = (id: string, offset: number) => encode(`${id}/${offset}`);
const decodeCursor = (cursor: string) => {
  const parts = decode(cursor).split('/');

  return {
    id: parts[0],
    offset: parseInt(parts[1], 10),
  };
};

export function createConnection({ first, last, cursor }: ConnectionArgs) {
  const previousCursor = cursor ? decodeCursor(cursor) : { offset: 0 };

  const take = first || last || 30;

  return {
    payload<E>(items: (E & { id: string })[]) {
      const edges = items.map((item, index) => ({
        node: item,
        cursor: encodeCursor(item.id, previousCursor.offset + index + 1),
      }));

      const hasNextPage = edges.length > take;

      return {
        edges: hasNextPage ? edges.slice(0, -1) : edges,
        pageInfo: {
          hasNextPage,
          hasPreviousPage: previousCursor.offset > 0,
          startCursor: edges.length > 0 ? edges[0].cursor : null,
          endCursor: edges.length > 0 ? edges[items.length - 1].cursor : null,
        },
      };
    },
    args(): { take: number; skip: number } {
      return {
        take: take + 1,
        skip: previousCursor.offset,
      };
    },
  };
}
