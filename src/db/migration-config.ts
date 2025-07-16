import { mongoMigrateCli } from "mongo-migrate-ts";

mongoMigrateCli({
  uri: "mongodb://admin:password123@localhost:27017/admin?authSource=admin",
  migrationsDir: "src/db/migrations",
  migrationsCollection: "migrations_changelog"
})