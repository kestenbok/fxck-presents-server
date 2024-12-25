#!/bin/bash

MIGRATION_DIR="src/core/database/migrations"
MIGRATION_NAME=$1

if [ -z "$MIGRATION_NAME" ]; then
    echo "You must enter a migration name"
    exit 1
fi

pnpm typeorm migration:generate "$MIGRATION_DIR/$MIGRATION_NAME" -d typeorm.config.js