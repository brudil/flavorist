export const decodeId = (id: string): { typename: string; id: number } => {
  const [typename, stringId] = Buffer.from(id, 'base64')
    .toString('utf-8')
    .split(':');
  return {
    typename,
    id: parseInt(stringId, 10),
  };
};
export const encodeId = (type: string, pk: number) =>
  Buffer.from(`${type}:${pk}`).toString('base64');
