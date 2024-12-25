#!/bin/bash

MIGRATION_DIR="src/core/database/migrations"
MIGRATION_NAME=$1

if [ -z "$MIGRATION_NAME" ]; then
    echo "You must enter a migration name"
    exit 1
fi

pnpm typeorm migration:create "$MIGRATION_DIR/$MIGRATION_NAME"