#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Script directory: $SCRIPT_DIR"
DB_FILE="$SCRIPT_DIR/data/app.db"
SCHEMA_FILE="$SCRIPT_DIR/seed/schema.sql"
SEED_FILE="$SCRIPT_DIR/seed/seed.sql"

echo "Initializing SQLite database..."

# Remove old DB if exists
if [ -f "$DB_FILE" ]; then
    rm "$DB_FILE"
    echo "Removed existing $DB_FILE"
fi

# Ensure the data directory exists
DATA_DIR="$(dirname "$DB_FILE")"
if [ ! -d "$DATA_DIR" ]; then
    mkdir -p "$DATA_DIR"
    echo "Created data directory $DATA_DIR"
fi

# Create new DB and apply schema
sqlite3 "$DB_FILE" < "$SCHEMA_FILE"
echo "Applied schema."

# Insert seed data
sqlite3 "$DB_FILE" < "$SEED_FILE"
echo "Inserted seed data."

echo "Database initialization complete."