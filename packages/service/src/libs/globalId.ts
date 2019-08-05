import { decode, encode } from './base64';

export const decodeId = (id: string): { typename: string; id: number } => {
  const [typename, stringId] = decode(id).split(':');
  return {
    typename,
    id: parseInt(stringId, 10),
  };
};
export const encodeId = (type: string, pk: number) => encode(`${type}:${pk}`);
