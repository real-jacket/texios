#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION
read -p "Releasing $VERSION - are you sure? (y/n): " -r REPLY
echo  # (optional) move to a new line
if [ $REPLY = "y" ]
then
  echo "Releasing $VERSION ..."

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  git push origin master

  # publish
  npm publish
fi
