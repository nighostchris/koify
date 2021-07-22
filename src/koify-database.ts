/* eslint-disable max-classes-per-file */
/**
 * How to use KoifyEnv
 *
 * Example:
 * const mysqlDbConfig = {
 *    client: 'mysql',
 *    connection: {
 *       host: envs.MYSQL_HOST,
 *       user: envs.MYSQL_USER,
 *       password: envs.MYSQL_PASSWORD,
 *       database: envs.MYSQL_DATABASE,
 *    }
 * };
 *
 * KoifyDatabase.addConnection(mysqlDbConfig, 'mysql');
 *
 * const db = new KoifyRelationalDatabase('user', 'mysql');
 * const result = await db.findAll();
 */

import knex, { Knex } from 'knex';

/**
 * Using Knex as the foundation, we create a global storage to store all database connection
 */
export class KoifyDatabase {
  private static store: Map<string, Knex<any, any[]>> = new Map();

  public static addConnection(config: Knex.Config, name: string): Knex<any, any[]> {
    let connection: Knex<any, any[]> | undefined = this.getConnection(name);

    if (typeof connection === 'undefined') {
      connection = knex(config);
      this.store.set(name, connection);
    }

    return connection;
  }

  public static getConnection(name: string): Knex<any, any[]> | undefined {
    return this.store.get(name);
  }

  public static removeConnection(name: string): boolean {
    try {
      const connection = this.store.get(name);

      if (typeof connection !== 'undefined') {
        connection.destroy();
      }

      this.store.delete(name);

      return true;
    } catch (err) {
      return false;
    }
  }
}

export class KoifyRelationalDatabase {
  private table: string;

  private connection: Knex<any, any[]>;

  constructor(tableName: string, dbName: string) {
    this.table = tableName;
    const connection = KoifyDatabase.getConnection(dbName);

    if (typeof connection === 'undefined') {
      throw new Error(`Cannot find database connection with name: ${dbName}`);
    }

    this.connection = connection;
  }

  public async findAll(columns?: string[]): Promise<any[]> {
    const selectColumns = typeof columns === 'undefined'
      ? ['*']
      : columns;

    const result = await this.connection(this.table)
      .select(...selectColumns);

    return result;
  }
}

export default KoifyDatabase;
