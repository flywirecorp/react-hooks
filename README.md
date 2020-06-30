# react-hooks &middot; [<img alt="Version" src="https://img.shields.io/npm/v/@flywire/react-hooks.svg">](https://www.npmjs.com/package/@flywire/react-hooks) [<img alt="Size" src="https://img.shields.io/bundlephobia/min/@flywire/react-hooks">](https://bundlephobia.com/result?p=@flywire/react-hooks)

![react-hooks](https://p43.f3.n0.cdn.getcloudapp.com/items/KouBAgwO/fly-hooks.png?v=f90b5de7d97396f9883cfc17d0784516)

A collection of Reacts hooks used in Flywire

## Install

Add the dependency to your `package.json`:

```bash
npm i @flywire/react-hooks
```

## Development

Install dependencies and peer dependencies:

```javascript
npm install
npm install react react-dom lodash.isequal validate.js@0.11.1 xregexp --no-save
```

## Run tests

```sh
npm run test
```

## Hooks

- [useForm](src/useForm/README.md)
- [useOnClickOutside](src/useOnClickOutside/README.md)
- [useOnScroll](src/useOnScroll/README.md)
- [useToggle](src/useToggle/README.md)
- [useValidate](src/useValidate/README.md)

## Releases

To create a new release, make all the changes that you need and commit them,
then execute:

```bash
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```

For example:

```bash
npm version patch
npm publish
```

or for a beta:

```bash
npm version prepatch
npm publish --tag beta
```

This will bump the `package.json` version, build a new bundle, commit, push the
changes tagging them to a new release.

Then create a PR and request the review from other project commiters. Once
accepted and merged to master, execute `npm publish` from master branch.
