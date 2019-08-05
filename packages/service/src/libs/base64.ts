export const decode = (value: string): string => {
  return Buffer.from(value, 'base64').toString('utf-8');
};

export const encode = (value: string | number): string =>
  Buffer.from(`${value}`).toString('base64');
