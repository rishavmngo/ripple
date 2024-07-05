import {TListItem} from './model';
import {COLOR_PALLETE} from './utils/Utils';

export const LISTS: TListItem[] = [
  {
    id: '1',
    title: 'Study',
    noOfItems: 5,
    totalDurationOfTasks: 2700000,
    itemColor: COLOR_PALLETE[0],
  },

  {
    id: '2',
    title: 'Work',
    noOfItems: 2,
    totalDurationOfTasks: 5400000,
    itemColor: COLOR_PALLETE[8],
  },
  {
    id: '3',
    title: 'College',
    noOfItems: 1,
    totalDurationOfTasks: 5800000,
    itemColor: COLOR_PALLETE[3],
  },
  {
    id: '4',
    title: 'Gym',
    noOfItems: 3,
    totalDurationOfTasks: 7500442,
    itemColor: COLOR_PALLETE[5],
  },
  {
    id: '5',
    title: 'Shopping',
    noOfItems: 15,
    totalDurationOfTasks: 3400000,
    itemColor: COLOR_PALLETE[4],
  },
];

export function getById(id) {
  return LISTS.find(item => item.id === id);
}
