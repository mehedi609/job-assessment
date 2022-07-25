import fs from 'fs';

export const parseData = async (path: string) => {
  const data = await fs.promises.readFile(`${__dirname}/${path}`, 'utf8');
  return JSON.parse(data);
};
