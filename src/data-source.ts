import { DataSource } from "typeorm";
import 'dotenv/config'

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5433,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || '123456789',
  database: process.env.DATABASE_NAME || 'quiz',
  synchronize: true,
  // logging: true,
  // entities: [User, Quiz, Question, Answer],
  logging: false,
  entities: ["src/entities/*.ts"],
  subscribers: [],
  migrations: ["src/migrations/*.ts"],
});
