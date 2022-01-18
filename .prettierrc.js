module.exports = {
  semi: true,
  singleQuote: true,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
};
