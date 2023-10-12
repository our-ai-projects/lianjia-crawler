import { Record } from '@src/models/Record';

export const getCache = async (batch: string) => {
  const result = await Record.findOne({ where: { batch } });
  if (result) return result.dataValues.record.split(',');
  return [];
};
