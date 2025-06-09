import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: mysql.Pool;
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      this.pool = mysql.createPool({
        host: this.configService.get('DB_HOST', 'localhost'),
        port: this.configService.get('DB_PORT', 3306),
        user: this.configService.get('DB_USER', 'root'),
        password: this.configService.get('DB_PASSWORD', ''),
        database: this.configService.get('DB_NAME', 'loan_management'),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        acquireTimeout: 60000,
        timeout: 60000,
      });

      // Test connection
      const connection = await this.pool.getConnection();
      this.logger.log('Database connection established successfully');
      connection.release();
    } catch (error) {
      this.logger.error('Failed to connect to database:', error);
      throw error;
    }
  }

  async callProcedure(
    procedureName: string,
    params: any[] = [],
  ): Promise<any> {
    try {
      const placeholders = params.map(() => '?').join(', ');
      const query = `CALL ${procedureName}(${placeholders})`;

      const [results] = await this.pool.execute(query, params);
      return results;
    } catch (error) {
      this.logger.error(`Error calling procedure ${procedureName}:`, error);
      throw error;
    }
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    try {
      const [results] = await this.pool.execute(sql, params);
      return results;
    } catch (error) {
      this.logger.error(`Error executing query:`, error);
      throw error;
    }
  }

  getConnection(): mysql.Pool {
    return this.pool;
  }
}
