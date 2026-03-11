#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Script directory: $SCRIPT_DIR"
DB_FILE="$SCRIPT_DIR/taskmanager.db"
SCHEMA_FILE="$SCRIPT_DIR/schema.sql"
SEED_FILE="$SCRIPT_DIR/seed.sql"

echo "Initializing SQLite database..."

# Remove old DB if exists
if [ -f "$DB_FILE" ]; then
    rm "$DB_FILE"
    echo "Removed existing $DB_FILE"
fi

# Create new DB and apply schema
sqlite3 "$DB_FILE" < "$SCHEMA_FILE"
echo "Applied schema."

# Insert seed data
sqlite3 "$DB_FILE" < "$SEED_FILE"
echo "Inserted seed data."

echo "Database initialization complete."