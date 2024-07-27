CREATE TABLE IF NOT EXISTS Lists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  bg_color TEXT,
  created_at TIMESTAMP CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
)

CREATE TABLE IF NOT EXISTS Tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  duration INTEGER,
  status TEXT,
  list_id INTEGER,
  created_at TIMESTAMP CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (list_id) REFERENCES Lists (id)
)

CREATE TABLE IF NOT EXISTS Timers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER,
  list_id INTEGER,
  time_spent INTEGER,
  created_at TIMESTAMP CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES Tasks (id)
  FOREIGN KEY (list_id) REFERENCES Lists (id)
)


INSERT INTO Lists(title,bg_color,created_at) VALUES('Study','#0f0f0f',CURRENT_TIMESTAMP);
INSERT INTO Tasks(title,duration,status,list_id,created_at) VALUES('Mathematics II',25, 'incomplete',2,CURRENT_TIMESTAMP);
INSERT INTO Tasks(title,duration,status,list_id,created_at) VALUES('react native',150, 'incomplete',2,CURRENT_TIMESTAMP);




SELECT 
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
WHERE l.id = 2
GROUP BY 
  l.id;