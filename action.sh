#!/bin/bash
echo "Starting the Storybook Action"

npm install && \
npm run storybook:build

echo "Storybook build done"
echo "Publishing to ${GITHUB_REPOSITORY} on branch ${remote_branch}"

cd docs && \
remote_repo="https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" && \
remote_branch="gh-pages" && \
git init && \
git config user.name "${GITHUB_ACTOR}" && \
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com" && \
git add . && \
git commit -m 'action build' > /dev/null 2>&1 && \
git push --force $remote_repo master:$remote_branch > /dev/null 2>&1 && \
rm -rf .git && \
cd ../

echo '👍 SUCCESS!'
