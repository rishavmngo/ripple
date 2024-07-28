import db from '@/db/db';
import {ID, TTask} from '@/model';
import {create} from 'zustand';

type state = {
  tasks: TTask[];
};

type Action = {
  fetchTasks: (id: ID) => void;
};
export const useTasks = create<state & Action>(set => ({
  tasks: [],
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
}));
