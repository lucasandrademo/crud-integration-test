import { createMasterConnection } from './database.config';
import { ConfigService } from '@nestjs/config';

export async function closeDatabaseIntegrationConnections(configService: ConfigService, databaseName: string) {
  const masterConnection = createMasterConnection(configService);

  try {
    await masterConnection.query(`DROP DATABASE \`${databaseName}\`;`);
    await masterConnection.destroy();
  } catch (err) {
    process.stderr.write(
      `${err instanceof Error ? err.stack : JSON.stringify(err)}\n`,
    );
    process.exit(1);
  }
}
