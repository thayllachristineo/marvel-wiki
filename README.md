# Marvel Comics Wiki 

[![Coverage Status](https://coveralls.io/repos/github/thayllachristineo/marvel-wiki/badge.svg?branch=main)](https://coveralls.io/github/thayllachristineo/marvel-wiki?branch=main)

With the Marvel Wiki you can search for your favorite superhero or superheroine and find out a little more about the character and his/her participation in the comics universe.


## About the project 

This project was bootstrapped with the `create-vite` tool, and the following technologies were used as development tools:

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/) 
- [TypeScript](https://www.typescriptlang.org/)
- [Chakra UI](https://chakra-ui.com/) (UI Library)
- [ESLint](https://eslint.org/) 
- [Prettier](https://prettier.io/) 
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io/pt-BR/)
- [js-md5](https://www.npmjs.com/package/js-md5) (Used for generate marvel api hash)
- [cross-fetch](https://www.npmjs.com/package/cross-fetch) (Fetch polyfill for unit tests)
- [npm](https://www.npmjs.com/)


## How to run the app

1 - Clone the project to your machine:
```git
git clone git@github.com:thayllachristineo/marvel-wiki.git
```

2 - Install the dependencies:
```git
npm install
```

3 - Before running the project, you need to:
- Access the [Marvel's Developer Portal](https://developer.marvel.com);
- Click on "Get a Key", located in the navigation menu;
- Login with your data;
- View the `public-key` and `private-key` keys.

4 - Returning to the project, create a `.env` file similar to `env.example` and enter the corresponding values:
```git
VITE_API_BASE_URL=https://gateway.marvel.com:443/v1/public
VITE_API_PUBLIC_KEY=public-key
VITE_API_PRIVATE_KEY=private-key
```

5 - Now, just run the development server:
```git
npm run dev
```

6 - After this, open http://localhost:5173 with your browser to see the app.


## Project structure
Below you can view the project structure:

```
.
├── public                          # Publicly files 
├── src                             # Source files 
│   ├── components                  # Reusable components
│   │   └── Example                 # Component folder
│   │   │   ├──  Example.test.ts    # Component unit tests
│   │   │   ├──  Example.types.ts   # Component types
│   │   │   └──  index.tsx          # Component logic and UI
│   ├── config                      # Set env variables
│   ├── hooks                       # Custom hooks
│   ├── Icons                       # Icons created
│   ├── lib                         # Reusable functions
│   ├── services                    # API calls
│   ├── types                       # API types
│   ├── App.test.tsx                # App unit tests
│   ├── App.tsx                     # Entry point of the App
│   ├── vite-end.d.ts               # Vite type definitions      
│   └── ...              
├── vite.config.ts                  # Vite configs
└── ...
```

## How to run unit tests

Unit tests were created for the entire project. To view them, simply run the command below in your terminal:
```git
npm run test
```

