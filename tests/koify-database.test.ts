import { KoifyEnv, KoifyDatabase, KoifyRelationalDatabase } from '../src';

describe('KoifyDatabase', () => {
  beforeAll(() => {
    interface ApplicationEnv {
      MYSQL_HOST: string,
      MYSQL_PORT: string,
      MYSQL_USER: string,
      MYSQL_PASSWORD: string,
      MYSQL_DATABASE: string,
      SQLITE_FILENAME: string,
      PG_HOST: string,
      PG_PORT: string,
      PG_USER: string,
      PG_PASSWORD: string,
      PG_DATABASE: string,
    }

    const envs = <ApplicationEnv>KoifyEnv(undefined, [
      'MYSQL_HOST',
      'MYSQL_USER',
      'MYSQL_PASSWORD',
      'MYSQL_DATABASE',
      'SQLITE_FILENAME',
      'PG_HOST',
      'PG_USER',
      'PG_PASSWORD',
      'PG_DATABASE',
    ]);

    const mysqlDbConfig = {
      client: 'mysql',
      connection: {
        host: envs.MYSQL_HOST,
        port: parseInt(envs.MYSQL_PORT, 10) || 3307,
        user: envs.MYSQL_USER,
        password: envs.MYSQL_PASSWORD,
        database: envs.MYSQL_DATABASE,
      },
    };

    const sqliteDbConfig = {
      client: 'sqlite3',
      connection: {
        filename: `${__dirname}/${envs.SQLITE_FILENAME}`,
      },
    };

    const pgDbConfig = {
      client: 'pg',
      connection: {
        host: envs.PG_HOST,
        port: parseInt(envs.PG_PORT, 10) || 5432,
        user: envs.PG_USER,
        password: envs.PG_PASSWORD,
        database: envs.PG_DATABASE,
      },
    };
  
    KoifyDatabase.addConnection(mysqlDbConfig, 'mysql');
    KoifyDatabase.addConnection(sqliteDbConfig, 'sqlite');
    KoifyDatabase.addConnection(pgDbConfig, 'pg');
  });

  test ('MySQL.findAll()', async () => {
    const db = new KoifyRelationalDatabase('user', 'mysql');
    const result = await db.findAll();

    expect(result).not.toBeUndefined;
    expect(result).not.toBeNull;
  }, 20000);

  test ('MySQL.findAll(["username", "name"])', async () => {
    const db = new KoifyRelationalDatabase('user', 'mysql');
    const result = await db.findAll(['username', 'name']);

    expect(result).not.toBeUndefined;
    expect(result).not.toBeNull;
  }, 20000);

  test ('SQLite.findAll()', async () => {
    const db = new KoifyRelationalDatabase('user', 'sqlite');
    const result = await db.findAll();

    expect(result).not.toBeUndefined;
    expect(result).not.toBeNull;
  }, 20000);

  test ('SQLite.findAll(["name", "address"])', async () => {
    const db = new KoifyRelationalDatabase('user', 'sqlite');
    const result = await db.findAll(['name', 'address']);

    expect(result).not.toBeUndefined;
    expect(result).not.toBeNull;
  }, 20000);

  test ('SQLite.findAll()', async () => {
    const db = new KoifyRelationalDatabase('users', 'pg');
    const result = await db.findAll();

    expect(result).not.toBeUndefined;
    expect(result).not.toBeNull;
  }, 20000);

  test ('SQLite.findAll(["name"])', async () => {
    const db = new KoifyRelationalDatabase('users', 'pg');
    const result = await db.findAll(['name']);

    expect(result).not.toBeUndefined;
    expect(result).not.toBeNull;
  }, 20000);

  afterAll(() => {
    KoifyDatabase.removeConnection('mysql');
    KoifyDatabase.removeConnection('sqlite');
    KoifyDatabase.removeConnection('pg');
  });
});
