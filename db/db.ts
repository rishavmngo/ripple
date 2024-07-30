import {ID, TListItem} from '@/model';
import {TTask} from '@/model';
import query from '@/queries/query';
import {openDatabase} from 'expo-sqlite/legacy';

const sqlliteDB = openDatabase('ripple.db');
async function executeSql<T>(
  sql: string,
  params: any[],
  mapper: (results: any) => T,
): Promise<T> {
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

async function getTasks(listId: ID): Promise<TTask[]> {
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

async function getListById(id: string): Promise<TListItem> {
  return executeSql(query.SELECT_LIST_WITH_ID, [id], results => {
    return results.rows._array[0];
  });
}

async function addTasks(task: TTask): Promise<boolean> {
  return new Promise((resolve, reject) => {
    sqlliteDB.transaction(tx => {
      tx.executeSql(
        query.ADD_TASK,
        [task.title, task.duration, task.status, task.list_id],
        (_tx, results) => {
          console.log(results);
          resolve(true);
        },
        (_tx, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
}

async function addList(title: string, bg_color: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    sqlliteDB.transaction(tx => {
      tx.executeSql(
        query.ADD_LIST,
        [title, bg_color],
        (_tx, results) => {
          console.log(results);
          resolve(true);
        },
        (_tx, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
}

async function deleteListByID(list_id: ID): Promise<boolean> {
  return new Promise((resolve, reject) => {
    sqlliteDB.transaction(tx => {
      tx.executeSql(
        query.DELETE_LIST_BY_ID,
        [list_id],
        (_tx, results) => {
          console.log(results);
          resolve(true);
        },
        (_tx, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
}
const db = {
  getTasks,
  getAllLists,
  getListById,
  addTasks,
  addList,
  deleteListByID,
};

export default db;
