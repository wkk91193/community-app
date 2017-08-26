#!/bin/bash

VERSION=$1
<<<<<<< HEAD
RELDATE=$2

if [ -z $VERSION -o -z $RELDATE ]; then
  echo -e "Version required.\nUsage: $0 version releasedate"
fi

echo "Updating version to $VERSION"

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
echo -e "{\n  \"version\": \"$VERSION\",\n  \"releasedate\": \"$RELDATE\"\n}\n" > $DIR/app/release.json
=======
if [ -z $VERSION ]; then
  echo "Usage: $0 version [releasedDate]"
  exit 1;
fi

RELDATE=$2
if [ -z $RELDATE ]; then
  RELDATE=$(date '+%d/%b/%y')
fi

APPDIR=apps/community-app
"$APPDIR/release.sh" "$VERSION" "$RELDATE"
echo "releaseVersion=$VERSION.RELEASE" > fineract-provider/gradle.properties
>>>>>>> upstream/develop

