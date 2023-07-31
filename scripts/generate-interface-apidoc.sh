#!/usr/bin/env bash

set -e

ADMIN_DIR_DEFAULT="$(dirname "$(pwd)")/contember-admin"
ADMIN_DIR_RESOLVED=${ADMIN_DIR:-$ADMIN_DIR_DEFAULT}

DOCS_DIR="$(pwd)"
VERSION="v1.2"

(cd "$ADMIN_DIR_RESOLVED" && yarn ts:build)
mkdir --parent "$DOCS_DIR/data"
(cd "$ADMIN_DIR_RESOLVED/packages/admin" && yarn run -T typedoc --json "$DOCS_DIR/data/interface-$VERSION.json" ./src/index.ts)
(cd "$ADMIN_DIR_RESOLVED/packages/layout" && yarn run -T typedoc --json "$DOCS_DIR/data/interface-layout-$VERSION.json" ./src/index.ts)

yarn tsx ./scripts/generateInterfaceApiDoc.ts "./data/interface-$VERSION.json" "./docs/reference/admin/api/$VERSION"
yarn tsx ./scripts/generateInterfaceApiDoc.ts "./data/interface-layout-$VERSION.json" "./docs/reference/admin/api/$VERSION"
