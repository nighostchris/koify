import knex, { Knex } from 'knex';

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
}

export class KoifyMySQLDatabase {
  private table: string;

  private connection: Knex<any, any[]> = knex({});

  constructor(tableName: string, dbName: string) {
    this.table = tableName;
    const connection = KoifyDatabase.getConnection(dbName);

    if (typeof connection !== 'undefined') {
      this.connection = connection;
    }
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
