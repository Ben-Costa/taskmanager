#!/bin/bash
rm -f server/db/taskmanager.db
sqlite3 server/db/taskmanager.db < server/db/schema.sql
sqlite3 server/db/taskmanager.db < server/db/seed.sql
echo "Database reset."