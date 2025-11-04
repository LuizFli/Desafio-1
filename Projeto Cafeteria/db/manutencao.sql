-- manutencao.sql
-- Script SQLite para criação e população do banco de dados manutencao.db
-- Requisitos atendidos:
-- 3.1 Nome do banco: manutencao.db (aberto via comando .open do shell do SQLite)
-- 3.2 Três registros por tabela criada
-- 3.3 Formato: .sql

-- Observação: o comando .open é específico do shell sqlite3 (não é SQL padrão).
-- Para executar no Windows PowerShell (se sqlite3 estiver instalado):
--   sqlite3.exe manutencao.db ".read manutencao.sql"
-- Ou dentro do shell do sqlite3:
--   .open manutencao.db
--   .read manutencao.sql

.open manutencao.db
PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- Idempotência: limpa as tabelas se existirem
DROP TABLE IF EXISTS "Product";
DROP TABLE IF EXISTS "User";

-- Tabelas (compatíveis com o schema atual do projeto)
CREATE TABLE "User" (
  "id"        INTEGER PRIMARY KEY AUTOINCREMENT,
  "email"     TEXT NOT NULL UNIQUE,
  "password"  TEXT NOT NULL,
  "name"      TEXT,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE "Product" (
  "id"          INTEGER PRIMARY KEY AUTOINCREMENT,
  "name"        TEXT NOT NULL,
  "description" TEXT,
  "price"       REAL NOT NULL DEFAULT 0,
  "quantity"    INTEGER NOT NULL DEFAULT 0,
  "createdAt"   TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Registros (mínimo 3 por tabela)
INSERT INTO "User" ("email","password","name") VALUES
  ('admin','admin','Administrador'),
  ('barista','123456','Barista'),
  ('caixa','123456','Caixa');

INSERT INTO "Product" ("name","description","price","quantity") VALUES
  ('Café Expresso','Dose 30ml',8.50, 50),
  ('Cappuccino','200ml',12.00, 30),
  ('Pão de Queijo','Unidade',5.00, 100);

COMMIT;