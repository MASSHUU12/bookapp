import { getItem } from './Storage';

/**
 * Basic log system.
 */
export const log = (items: any): void => {
  getItem('logsEnabled').then(enabled => {
    if (enabled === 'true') console.log(items);
  });
};
