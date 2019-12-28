module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/database/migration/**/*.ts"],
  subscribers: ["src/database/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/database/migrations",
    subscribersDir: "src/database/subscribers"
  }
};
