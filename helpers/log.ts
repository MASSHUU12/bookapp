import { getItem } from './Storage';

/**
 * Basic log system.
 */
export const Log = (items: any): void => {
  getItem('logsEnabled').then(enabled => {
    if (enabled === 'true') console.log(items);
  });
};
