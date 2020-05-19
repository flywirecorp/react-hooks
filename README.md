# react-hooks

react-hooks is a set of hooks used in Flywire.

## Installation

Add the dependency to your `package.json`:

```javascript
npm i @flywire/react-hooks
```

## Create a new release

To create a new release, make all the changes that you need and commit them, then execute:

```bash
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```

For example:

```bash
npm version patch
```

This will bump the `package.json` version, build a new bundle, commit, push the changes tagging them to a new release and update the documentation.

Then create a PR and request the review from other project commiters. Once accepted and merged to master, execute `npm publish` from master branch.

## Documentation

[https://peertransfer.github.io/react-hooks/](https://peertransfer.github.io/react-hooks/)

The documentation source is under the `stories` folder, we are using Storybook. 
It is generated automatically and published to `gh-pages` after a merge with master.
In development, just run:

```
> npm run storybook
```
