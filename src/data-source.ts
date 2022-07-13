import { DataSource } from "typeorm";
import 'dotenv/config'

export const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5433,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || '123456789',
  database: process.env.DATABASE_NAME || 'quiz',

  // host: "ec2-52-206-182-219.compute-1.amazonaws.com",
  // port: 5432,
  // username: "rxwnsfkgiuxlih",
  // password: "3180ba01206c43d94cc6f4c47e4345295a027fa813ed32a505aee949890b75c2",
  // database: "d4v3rh588atk5d",
  // ssl: {
  //   rejectUnauthorized: false
  // },

  synchronize: true,
  // logging: true,
  // entities: [User, Quiz, Question, Answer],
  logging: false,
  entities: ["src/entities/*.ts"],
  subscribers: [],
  migrations: ["src/migrations/*.ts"],
});
