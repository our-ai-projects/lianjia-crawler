import { Record } from '@src/models/Record';

export const getCache = async (type: number, batch: string) => {
  const result = await Record.findOne({ where: { batch, type } });

  if (result)
    return {
      batchId: result.dataValues.id as number,
      cache: result.dataValues.record.split(',')
    };

  const record = await Record.create({ type, batch, record: '' });

  return {
    batchId: record.dataValues.id as number,
    cache: []
  };
};

export const updateCache = async (
  type: number,
  batchId: number,
  record: string[]
) => {
  await Record.update(
    { record: record.join(',') },
    { where: { id: batchId, type } }
  );
};
