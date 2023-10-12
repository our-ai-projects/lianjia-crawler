import { Record } from '@src/models/Record';

export const getCache = async (batch: string) => {
  const result = await Record.findOne({ where: { batch } });

  if (result) return result.dataValues.record.split(',');

  await Record.create({ type: 1, batch, record: '' });

  return [];
};

export const updateCache = async (batch: string, record: string[]) => {
  await Record.update(
    { record: record.join(',') },
    { where: { batch, type: 1 } }
  );
};
