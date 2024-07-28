import {TListItem} from '@/model';
import {TTask} from '@/model';
import query from '@/queries/query';
import {openDatabase} from 'expo-sqlite/legacy';

const sqlliteDB = openDatabase('ripple.db');
async function executeSql<T>(
  sql: string,
  params: any[],
  mapper: (results: any) => T[],
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    sqlliteDB.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (_tx, results) => {
          const data = mapper(results);
          resolve(data);
        },
        (_tx, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
}

async function getTasks(listId: number): Promise<TTask[]> {
  return executeSql(query.SELECT_TASK_WITH_ID, [listId], results => {
    const tasks = [];
    for (let i = 0; i < results.rows.length; i++) {
      tasks.push(results.rows.item(i));
    }
    return tasks;
  });
}

async function getAllLists(): Promise<TListItem[]> {
  return executeSql(query.SELECT_ALL_LISTS, [], results => {
    const lists = [];
    for (let i = 0; i < results.rows.length; i++) {
      lists.push(results.rows.item(i));
    }
    return lists;
  });
}

const db = {
  getTasks,
  getAllLists,
};

export default db;
