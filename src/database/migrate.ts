import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./client";

async function doMigration() {
    console.log("👷 Starting migration...");
    await migrate(db, {
        migrationsFolder: './src/database/migrations'
    });
    console.log("✨ Migration completed!");
    
    process.exit(0);
}

doMigration();