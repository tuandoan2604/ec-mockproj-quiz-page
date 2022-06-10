import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "123456789",
  database: "testdb",
  synchronize: true,
  // logging: true,
  // entities: [User, Quiz, Question, Answer],
  logging: false,
  entities: ["src/entities/*.ts"],
  subscribers: [],
  migrations: [],
});
