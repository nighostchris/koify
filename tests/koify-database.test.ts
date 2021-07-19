import { KoifyEnv, KoifyDatabase, KoifyMySQLDatabase } from '../src';

describe('KoifyDatabase', () => {
  beforeAll(() => {
    interface ApplicationEnv {
      MYSQL_HOST: string,
      MYSQL_USER: string,
      MYSQL_PASSWORD: string,
      MYSQL_DATABASE: string,
      MYSQL_TEST: string,
    }

    const envs = <ApplicationEnv>KoifyEnv(undefined, [
      'MYSQL_HOST',
      'MYSQL_USER',
      'MYSQL_PASSWORD',
      'MYSQL_DATABASE',
      'MYSQL_TEST'
    ]);

    const mysqlDbConfig = {
      client: 'mysql',
      connection: {
        host: envs.MYSQL_HOST,
        user: envs.MYSQL_USER,
        password: envs.MYSQL_PASSWORD,
        database: envs.MYSQL_DATABASE,
      }
    };
  
    KoifyDatabase.addConnection(mysqlDbConfig, 'mysql');
  })

  test ('KoifyMySQLDatabase.findAll()', async () => {
    const db = new KoifyMySQLDatabase('user', 'mysql');
    const result = await db.findAll();

    expect(result).not.toBeUndefined;
    expect(result).not.toBeNull;
  }, 20000);

  test ('KoifyMySQLDatabase.findAll(["username", "salt"])', async () => {
    const db = new KoifyMySQLDatabase('user', 'mysql');
    const result = await db.findAll(['username', 'name']);

    expect(result).not.toBeUndefined;
    expect(result).not.toBeNull;
  }, 20000);

  afterAll(() => {
    KoifyDatabase.removeConnection('mysql');
  })
});
