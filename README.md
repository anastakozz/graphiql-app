# GraphQL

GraphQL Playground is a custom application designed to facilitate the exploration and testing of GraphQL APIs. It serves as an interactive development environment that allows users to interact with GraphQL endpoints in a user-friendly and efficient manner. GraphQL Playground serves as a powerful tool for developers to iteratively build and test GraphQL queries, ensuring a smooth development process when working with GraphQL APIs.

# Application structure

- **Welcome page**
- **User auth**
- **GraphQL page with:**
  - request editor (query editor / JSON viewer)
  - variables editor
  - headers editor
  - documentation explorer (should be lazy-loaded)
  - response section (query editor / JSON viewer)
  - possibility to change to a different user-specified API endpoint

## Technology Stack:

- TypeScript
- React
- Redux Tool Kit
- Google Firebase
- Yup
- SCSS
- ESLint
- Vite
- Vitest

## Deployment

You can see the deployment of the project at [https://graphiql-app-usebrain.vercel.app/](https://graphiql-app-usebrain.vercel.app/)

## Installation and Usage

To run this project locally, follow these steps:

1. Clone this repository
2. Run 'npm i'
3. Run 'npm run dev'

## Screenshot

![Screenshot 1](https://private-user-images.githubusercontent.com/117598324/293973544-e943662c-fc38-4d3e-94d3-7a6e45831337.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDUxNjYwMzksIm5iZiI6MTcwNTE2NTczOSwicGF0aCI6Ii8xMTc1OTgzMjQvMjkzOTczNTQ0LWU5NDM2NjJjLWZjMzgtNGQzZS05NGQzLTdhNmU0NTgzMTMzNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMTEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDExM1QxNzA4NTlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mZDE4NGY5Y2JiNDcyOTNjM2E3NzUwNDc0MDhjYjdhMjY2NDY5YzQ2NmU4NTNmMTM4MDg3Mjg0NTUwZGZlOWU5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.j2gaYzVxXNyz2tT4hF6u5YE2hZS_Z54Fcvwn6CIaxOE)

## Available Scripts

- **'npm run build':** This script triggers the Vite bundler to build your project in production mode. It sets the Node environment to production.
- **'npm run dev':** This script starts a development server using Vite built-in development server, allowing you to preview and test your project locally.
- **'npm run lint':** This script runs ESLint, a code analysis tool, on the code located in the src directory of your project. It automatically fixes code style and syntax issues using the --fix option, ensuring that your code conforms to defined coding standards and maintains consistency.
- **'npm run format':** This script utilizes Prettier to automatically format code in the entire project according to the defined rules.
- **'npm run coverage':** This script runs the tests using Vite's testing solution with coverage reporting enabled. It helps to assess how much of the codebase is covered by the tests.
- **'npm run preview':** This script is likely used to preview the production build locally using Vite's preview server.
- **'npm run prepare':** This script prepares the project for using Husky, a tool for Git hooks. It removes any existing Husky configuration, installs Husky, and sets up pre-commit and pre-push hooks to run lint-staged and tests, respectively, before commits and pushes.
