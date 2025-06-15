import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: mysql.Pool;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.pool = mysql.createPool({
      host: this.configService.get('DB_HOST', 'localhost'),
      port: this.configService.get('DB_PORT', 3306),
      user: this.configService.get('DB_USERNAME', 'root'),
      password: this.configService.get('DB_PASSWORD', ''),
      database: this.configService.get('DB_DATABASE', 'lms_db'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test the connection
    try {
      const connection = await this.pool.getConnection();
      console.log('✅ Database connected successfully');
      connection.release();
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
      console.log('Database connection pool closed');
    }
  }

  async callProcedure(
    procedureName: string,
    parameters: any[] = [],
  ): Promise<any> {
    try {
      const placeholders = parameters.map(() => '?').join(', ');
      const query = `CALL ${procedureName}(${placeholders})`;

      console.log(`Executing stored procedure: ${procedureName}`, {
        parameters,
      });

      const [results] = await this.pool.execute(query, parameters);
      return results;
    } catch (error) {
      console.error(
        `Error executing stored procedure ${procedureName}:`,
        error.message,
      );
      throw error;
    }
  }

  async callFunction(
    functionName: string,
    parameters: any[] = [],
  ): Promise<any> {
    try {
      const placeholders = parameters.map(() => '?').join(', ');
      const query = `SELECT ${functionName}(${placeholders}) as result`;

      console.log(`Executing stored function: ${functionName}`, { parameters });

      const [results] = await this.pool.execute(query, parameters);
      return (results as any)[0]?.result;
    } catch (error) {
      console.error(
        `Error executing stored function ${functionName}:`,
        error.message,
      );
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const connection = await this.pool.getConnection();
      connection.release();
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error.message);
      return false;
    }
  }
}
