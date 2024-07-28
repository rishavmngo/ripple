import query from '@/queries/query';
import {openDatabase} from 'expo-sqlite/legacy';

const sqlliteDB = openDatabase('ripple.db');

async function getTasks(listId: number) {
  return new Promise((resolve, reject) => {
    sqlliteDB.transaction(tx => {
      tx.executeSql(
        query.SELECT_TASK_WITH_ID,
        [listId],
        (tx, results) => {
          const tasks = [];
          for (let i = 0; i < results.rows.length; i++) {
            tasks.push(results.rows.item(i));
          }
          resolve(tasks);
        },
        (tx, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
}

const db = {
  getTasks,
};

export default db;
