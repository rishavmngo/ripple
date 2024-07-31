const UPDATE_TASK_STATUS = 'UPDATE Tasks SET status = ? WHERE id = ?';
const SELECT_TASK_WITH_ID = 'SELECT * FROM Tasks WHERE list_id=?';
const SELECT_TASKS_BY_DATE =
  'SELECT t.id as id, t.title as title , t.created_at as created_at, l.title as list_name FROM Tasks t LEFT JOIN Lists l on l.id = t.list_id WHERE DATE(t.created_at, "+5 hours", "+30 minutes") = DATE(?, "localtime", "+1 day") AND l.title IS NOT NULL';
const SELECT_TASKS_FROM_TODAY =
  "SELECT t.id as id, t.title as title , t.created_at as created_at, l.title as list_name FROM Tasks t LEFT JOIN Lists l on l.id = t.list_id WHERE  DATE(t.created_at) = DATE('now') AND l.title IS NOT NULL";
const SELECT_TASKS_FROM_TODAY_BY_LIST_ID =
  "SELECT t.id as id, t.title as title , t.created_at as created_at, l.title as list_name FROM Tasks t LEFT JOIN Lists l on l.id = t.list_id WHERE  DATE(t.created_at) = DATE('now') AND l.title IS NOT NULL";
const DELETE_TASK_BY_ID = 'DELETE FROM Tasks WHERE id=?';
const DELETE_LIST_BY_ID = 'DELETE FROM Lists WHERE id=?';
const ADD_TASK =
  'INSERT INTO Tasks(title,duration,status,list_id,created_at) VALUES(?,?, ?,?,CURRENT_TIMESTAMP)';

const ADD_LIST =
  'INSERT INTO Lists(title,bg_color,created_at) VALUES(?,?,CURRENT_TIMESTAMP)';
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
  SELECT_TASKS_FROM_TODAY,
  SELECT_TASKS_FROM_TODAY_BY_LIST_ID,
  SELECT_TASKS_BY_DATE,
  SELECT_ALL_LISTS,
  DELETE_TASK_BY_ID,
  DELETE_LIST_BY_ID,
  ADD_TASK,
  ADD_LIST,
};

export default query;
