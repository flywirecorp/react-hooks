# react-hooks

react-hooks is a set of hooks used in Flywire.

## Installation

Add the dependency to your `package.json`:

```javascript
npm i @flywire/react-hooks
```

## Development

Install dependencies and peer dependencies:

```javascript
npm install
npm install react react-dom --no-save
```

## Hooks

* [useForm](src/useForm/README.md)
* [useOnClickOutside](src/useOnClickOutside/README.md)
* [useOnScroll](src/useOnScroll/README.md)
* [useToggle](src/useToggle/README.md)
* [useValidate](src/useValidate/README.md)

## Create a new release

To create a new release, make all the changes that you need and commit them, then execute:

```bash
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```

For example:

```bash
npm version patch
npm publish
```

or beta:

```bash
npm version prepatch
npm publish --tag beta
```

This will bump the `package.json` version, build a new bundle, commit, push the changes tagging them to a new release and update the documentation.

Then create a PR and request the review from other project commiters. Once accepted and merged to master, execute `npm publish` from master branch.

