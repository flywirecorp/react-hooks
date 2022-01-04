module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 1%, last 2 versions, Android >= 4, ie >= 10, ios >= 7"
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}

