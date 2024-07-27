export type TListItem = {
  id: number;
  title: string;
  bg_color: string;
  created_at: string | null;
  updated_at: string | null;
  total_tasks: number;
  total_duration: number;
};

export type TTask = {
  id: number;
  title: string;
  duration: number;
  status: string;
  list_id: number;
  created_at: string | null;
  updated_at: string | null;
};
