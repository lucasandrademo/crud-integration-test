import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { randomBytes } from 'crypto';

// Gerar dinamicamente o nome do banco de dados de teste
export const databaseName: string = `test_${randomBytes(8).toString('hex')}`;

export function createMasterConnection(configService: ConfigService) {
  return new DataSource({
    type: 'mysql',
    host: configService.getOrThrow('MYSQL_HOST'),
    port: configService.getOrThrow<number>('MYSQL_PORT'),
    username: configService.getOrThrow('MYSQL_USERNAME'),
    password: configService.getOrThrow('MYSQL_PASSWORD'),
    database: configService.getOrThrow('MYSQL_DATABASE'),
  });
}

export function createTestConnection(configService: ConfigService) {
  return new DataSource({
    type: 'mysql',
    host: configService.getOrThrow('MYSQL_HOST'),
    port: configService.getOrThrow<number>('MYSQL_PORT'),
    username: configService.getOrThrow('MYSQL_USERNAME'),
    password: configService.getOrThrow('MYSQL_PASSWORD'),
    database: databaseName,
  });
}
