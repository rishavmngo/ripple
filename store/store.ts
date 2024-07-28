import db from '@/db/db';
import {TTask} from '@/model';
import {create} from 'zustand';

type state = {
  tasks: TTask[];
};

type Action = {
  fetchTasks: (id: number) => void;
};
export const useTasks = create<state & Action>(set => ({
  tasks: [],
  fetchTasks: (id: number) => {
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
