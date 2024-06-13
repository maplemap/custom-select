# [EDU] Custom Select component
This is a custom select component that was created for educational purposes. 
It is a simple component that can be used in any project. It is almost production-ready component, and also it can be used as a base for a more complex component.

## Demo 🚀
You can see the **[Demo Here](https://maplemap.github.io/custom-select/)** .

## Structure of the project
The project is structured in the following way:
- `eslintrc.js` - ESLint configuration file
- `.browserlistrc` - Browserslist configuration file
- `.pretterrc` - prettier configuration file
- `config-overrides.js` - configuration file for the react-app-rewired (reconfiguration of Webpack)
- `src` - source code of the project
  - `components` - common components of the project
    - `custom-select` - custom select component
      - `custom-select.js` - custom select functionality 
      - `custom-select.modules.css` - styles for the custom select component
      - `__tests__` - tests for the custom select component
    - `icons` - icons components
  - `hooks` - common hooks of the project
  - `modules` - modules of the project
    - `users` - users module
      - `users-page.js` - users page functionality
      - `user-page.module.scss` - users module styles
      - `use-users.js` - hook for getting users data
      - `services` - services for the users module
        - `api` - api service for the users module
            - `use-fetch-users.js` - hook for fetching users data from api
  - `styles` - common styles of the project
   - `main.scss` - main styles of the project
   - `mixins.scss` - style mixins for the project
   - `variables.scss` - style variables for the project
  - `app.js` - main application component
  - `index.js` - entry point of the application
