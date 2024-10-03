import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createMasterConnection, createTestConnection } from './database/database.config';

describe('Database Connection Test', () => {
  let app: INestApplication;
  let configService: ConfigService;
  let connection;
  let masterConnection;

  jest.setTimeout(30000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    app = module.createNestApplication();
    configService = module.get(ConfigService);
    masterConnection = createMasterConnection(configService);
    try {
      await masterConnection.initialize();
      const testDatabaseName = createTestConnection(configService).options.database;
      await masterConnection.query(`CREATE DATABASE \`${testDatabaseName}\`;`);
      connection = createTestConnection(configService);
      await connection.initialize();
    } catch (err) {
      console.error(`Failed to connect to the database: ${err.message}`);
      throw err;
    }
  });

  afterAll(async () => {
    if (connection.isInitialized) {
      await connection.destroy();
    }
    const testDatabaseName = createTestConnection(configService).options.database;
    await masterConnection.query(`DROP DATABASE \`${testDatabaseName}\`;`);
    await masterConnection.destroy();
  });

  it('should establish a connection to the test database', async () => {
    expect(connection.isInitialized).toBe(true);
  });
});
