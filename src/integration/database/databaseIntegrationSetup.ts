import { createMasterConnection, createTestConnection } from './database.config';
import { ConfigService } from '@nestjs/config';

export async function databaseIntegrationSetup(configService: ConfigService) {
  const masterConnection = createMasterConnection(configService);
  const testConnection = createTestConnection(configService);
  try {
    await masterConnection.initialize();
    await masterConnection.query(`CREATE DATABASE \`${testConnection.options.database}\`;`);
  } catch (err) {
    process.stderr.write(
      `${err instanceof Error ? err.stack : JSON.stringify(err)}\n`,
    );
    process.exit(1);
  }
  return testConnection;
}
