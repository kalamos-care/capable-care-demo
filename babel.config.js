// Once all the code is converted to TS, we'll be able to remove this

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    "@babel/preset-react"
  ],
};