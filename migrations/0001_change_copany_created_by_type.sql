-- Migration number: 0001 	 2025-05-10T02:08:53.993Z
-- 创建新表，修改 created_by 为 TEXT 类型
CREATE TABLE Copany_new (
  id INTEGER PRIMARY KEY,
  github_url TEXT,
  name TEXT,
  description TEXT,
  created_by TEXT, -- ← 类型变成 TEXT
  project_type TEXT,
  project_stage TEXT,
  main_language TEXT,
  license TEXT,
  created_at TEXT,
  updated_at TEXT
);

-- 拷贝旧表数据，CAST created_by 为 TEXT
INSERT INTO Copany_new (
  id, github_url, name, description, created_by,
  project_type, project_stage, main_language,
  license, created_at, updated_at
)
SELECT
  id, github_url, name, description, CAST(created_by AS TEXT),
  project_type, project_stage, main_language,
  license, created_at, updated_at
FROM Copany;

-- 删除旧表
DROP TABLE Copany;

-- 重命名新表
ALTER TABLE Copany_new RENAME TO Copany;