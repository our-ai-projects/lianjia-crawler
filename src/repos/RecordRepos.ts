import { Record } from '@src/models/Record';

export const getCache = async (batch: string) => {
  const result = await Record.findOne({ where: { batch } });

  if (result)
    return {
      batchId: result.dataValues.id as number,
      cache: result.dataValues.record.split(',')
    };

  const record = await Record.create({ type: 1, batch, record: '' });

  return {
    batchId: record.dataValues.id as number,
    cache: []
  };
};

export const updateCache = async (batch: string, record: string[]) => {
  await Record.update(
    { record: record.join(',') },
    { where: { batch, type: 1 } }
  );
};
