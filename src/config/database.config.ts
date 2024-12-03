import { Pool } from 'pg';

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: '1234',
  database: 'postgre_sql_btgr',
});
