import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';

export class Migration1752624862997 implements MigrationInterface {
  public async up(db: Db): Promise<void | never> {
    await db.createCollection('users')
    await db.collection('users').createIndex({ email: 1 }, { unique: true })
  }

  public async down(db: Db): Promise<void | never> {
    await db.collection('users').dropIndex('email_1')
    await db.dropCollection('users')
  }
}
