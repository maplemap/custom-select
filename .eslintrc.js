const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  settings: {
    react: {
      version: 'detect',
    }
  },
  env: {
    browser: true,
    jest: true,
    es6: true,
    jasmine: true
  },
  plugins: [
    'jasmine',
    'import'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jasmine/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/warnings',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? ERROR : WARNING,
    'no-eval': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': ERROR,
    'max-params': [ERROR, 3],
    'no-debugger': ERROR,
    'no-nested-ternary': ERROR,
    'object-shorthand': ERROR,
    'no-unused-vars': ERROR,
    'no-use-before-define': ERROR,
    'react/prop-types': OFF,
    'react/display-name': OFF,
    'import/no-anonymous-default-export': ERROR,
    'import/no-named-as-default': OFF,
    'jasmine/new-line-between-declarations': ERROR,
    'jasmine/new-line-before-expect': ERROR,
    'jasmine/prefer-toHaveBeenCalledWith': ERROR,
    'jasmine/expect-matcher': ERROR,
    'jasmine/prefer-jasmine-matcher': ERROR,
    'jasmine/no-disabled-tests': ERROR,
    'jasmine/no-suite-dupes': [ERROR, 'branch'],
    'jasmine/no-spec-dupes': [ERROR, 'branch'],
    'jasmine/no-unsafe-spy': ERROR
  },
  overrides: [
    {
      files: ['*.js', '*.test.js'],
      env: {
        jest: true
      }
    }
  ],
}
