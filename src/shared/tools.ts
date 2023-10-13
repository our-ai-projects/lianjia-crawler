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
  const {
    CRAWLER_TYPE = 2,
    CRAWLER_BATCH = getBatch(),
    CRAWLER_CRON
  } = EnvVars;
  return {
    CRAWLER_TYPE,
    CRAWLER_BATCH,
    CRAWLER_CRON
  };
};
