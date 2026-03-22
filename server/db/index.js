const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'app.db');
const useInMemory = process.env.DB_PATH === ':memory:';
const createSchema = process.env.CREATE_SCHEMA !== 'false';
const seedData = process.env.SEED_DATA !== 'false';

if (!useInMemory ) {
    // Ensure the database file exists
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

const db = new Database(DB_PATH);


// Run schema.sql
if (createSchema) {
    const schemaPath = path.join(__dirname, 'seed/schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');
    db.exec(schemaSQL);
    console.log('Database schema created.');
}

// Run seed.sql
if (seedData) {
    const seedPath = path.join(__dirname, 'seed/seed.sql');
    if (fs.existsSync(seedPath)) {
        const seedSQL = fs.readFileSync(seedPath, 'utf-8');
        db.exec(seedSQL);
        console.log('Database seeded with initial data.');
    } else {
        console.warn('Seed file not found, skipping seeding.');
    }
}


console.log(
    useInMemory ? 'Using in-memory database' : `Using database file at ${DB_PATH}`
)

module.exports = db;