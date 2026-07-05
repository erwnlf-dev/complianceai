-- D1 SQL Schema for ComplianceAI

CREATE TABLE IF NOT EXISTS policies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  framework TEXT CHECK(framework IN ('OJK', 'UU_PDP', 'ISO27001')),
  status TEXT CHECK(status IN ('draft', 'active', 'archived')),
  createdAt INTEGER,
  updatedAt INTEGER
);

CREATE TABLE IF NOT EXISTS integrations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK(type IN ('slack', 'jira', 'discord', 'gdrive', 'pagerduty')),
  status TEXT CHECK(status IN ('connected', 'disconnected')),
  config TEXT, -- Store JSON config
  createdAt INTEGER,
  updatedAt INTEGER
);

CREATE TABLE IF NOT EXISTS evidence (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT CHECK(source IN ('AWS', 'GCP', 'Manual')),
  status TEXT CHECK(status IN ('valid', 'expired', 'warning')),
  policyId TEXT,
  createdAt INTEGER,
  updatedAt INTEGER,
  FOREIGN KEY(policyId) REFERENCES policies(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  details TEXT,
  createdAt INTEGER
);

-- Seed Data (Pasar Lokal Indonesia)
INSERT OR IGNORE INTO policies (id, title, description, framework, status, createdAt, updatedAt) VALUES
('p1', 'Kebijakan Pelindungan Data Pribadi (PDP)', 'Dokumen kebijakan kepatuhan data nasabah sesuai regulasi UU PDP No. 27 Tahun 2022.', 'UU_PDP', 'active', 1704067200, 1704067200),
('p2', 'Manajemen Risiko Teknologi Informasi OJK', 'Penyelenggaraan tata kelola teknologi informasi sesuai SEOJK No. 21/SEOJK.03/2017.', 'OJK', 'active', 1704067200, 1704067200);

INSERT OR IGNORE INTO integrations (id, name, type, status, config, createdAt, updatedAt) VALUES
('i1', 'Slack Notification Provider', 'slack', 'connected', '{"channel": "#alerts-kepatuhan"}', 1704067200, 1704067200);

INSERT OR IGNORE INTO evidence (id, title, source, status, policyId, createdAt, updatedAt) VALUES
('e1', 'Enkripsi Bucket S3 AWS - Data Nasabah', 'AWS', 'valid', 'p1', 1704067200, 1704067200);

INSERT OR IGNORE INTO logs (id, action, details, createdAt) VALUES
('l1', 'DATABASE_INITIALIZATION', 'Skema tabel kepatuhan berhasil disinkronisasi ke D1 cloud database.', 1704067200);
