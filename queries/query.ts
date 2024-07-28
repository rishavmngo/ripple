const UPDATE_TASK_STATUS = 'UPDATE Tasks SET status = ? WHERE id = ?';
const SELECT_TASK_WITH_ID = 'SELECT * FROM Tasks WHERE list_id=?';
const DELETE_TASK_BY_ID = 'DELETE FROM Tasks WHERE id=?';
const SELECT_LIST_WITH_ID = `SELECT 
  l.id,
  l.title,
  l.bg_color,
  l.created_at,
  l.updated_at,
  IFNULL(SUM(t.duration), 0) AS total_duration
FROM 
  Lists l
LEFT JOIN 
  Tasks t 
ON 
  l.id = t.list_id
WHERE l.id =? 
GROUP BY 
  l.id`;

const SELECT_ALL_LISTS = `SELECT 
  l.id,
  l.title,
  l.bg_color,
  l.created_at,
  l.updated_at,
  IFNULL(SUM(t.duration), 0) AS total_duration,
  IFNULL(COUNT(t.id), 0) AS total_tasks
FROM 
  Lists l
LEFT JOIN 
  Tasks t 
ON 
  l.id = t.list_id
GROUP BY 
  l.id;
`;

const query = {
  UPDATE_TASK_STATUS,
  SELECT_TASK_WITH_ID,
  SELECT_LIST_WITH_ID,
  SELECT_ALL_LISTS,
  DELETE_TASK_BY_ID,
};

export default query;
