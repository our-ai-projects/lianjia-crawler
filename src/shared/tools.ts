import moment from 'moment';
import logger from 'jet-logger';
import EnvVars from '@src/constants/EnvVars';

export const getRandom = (start: number, end: number) =>
  Math.floor(Math.random() * (end - start + 1) + start);

const delaySync = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

export const delayWithConsole = async (ms = 60) => {
  while (ms) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    logger.info(`countdown: ${ms--}`);
  }
};

export const delay = async (start = 3, end = 15) => {
  const delay = getRandom(start, end) * 100;

  logger.info(`delay ${delay}ms`);

  await delaySync(delay);
};

export const getBatch = () => moment().format('YYYY-MM-DD');

export const getEnvVars = () => {
  const { CRAWLER_TYPE, CRAWLER_BATCH } = EnvVars;

  return {
    ...EnvVars,
    CRAWLER_TYPE: Number(CRAWLER_TYPE || 2),
    CRAWLER_BATCH: CRAWLER_BATCH || getBatch()
  };
};

export const jsonFormatted = (jsonObj: any) => JSON.stringify(jsonObj, null, 2);

export const unique = (history: string[], all: string[]) =>
  all.filter(k => !history.includes(k));
