import db from '@/db/db';
import {ID, TListItem, TTask} from '@/model';
import {create} from 'zustand';

type state = {
  tasks: TTask[];
  lists: TListItem[];
};

type Action = {
  fetchTasks: (id: ID) => void;
  fetchAllLists: () => void;
};
export const useTasks = create<state & Action>(set => ({
  tasks: [],
  lists: [],
  fetchTasks: (id: ID) => {
    try {
      db.getTasks(id)
        .then(tasks => {
          set({tasks});
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  },
  fetchAllLists: () => {
    try {
      db.getAllLists()
        .then(lists => {
          set({lists});
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      console.error(error);
    }
  },
}));
