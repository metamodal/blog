# Step 1
Create an npm project:
```sh
mkdir express-ts-project
cd express-ts-project
npm init -y
```

#Step 2
Install dependencies:
```sh
# Express-related deps
npm install express cors

# Tooling
npm install -D typescript eslint nodemon ts-node @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Typings
npm i -D @types/cors @types/express @types/node
```
- `cors`: to allow cross-origin requests
- `ts-node`: to run TypeScript programs directly from the terminal (instead of having to transpile to JavaScript first)
- `nodemon`: to run your project in "watch" mode, meaning the program is automatically restarted every time you change your code
- `@typescript-eslint/parser`: allows ESLint to understand TypeScript syntax
- `@typescript-eslint/eslint-plugin`: loads the ESLint rules defined by you

# Step 3
Create a file named `tsconfig.json` in the root of your project and paste the following config:

```json
{
  "compilerOptions": {
    "lib": ["es2018"],
    "module": "commonjs",
    "target": "es2018",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

# Step 4
Create a file named `.eslintrc` in the root of your project, and paste the following config:
```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

# Step 5
Create a folder named `src` and inside it a file `src/index.ts`. Paste the following in `index.ts`:
```ts
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => console.log("Listening on port " + port));
```

# Step 6
Add the following in the `scripts` object in `package.json`:
```json
"scripts": {
  "build": "tsc",
  "start": "nodemon src/index.ts"
}
```

# Step 7
From the root of your project, run the command:
```sh
npm start
```
Go to http://localhost:3000 on your browser. If you see "Hello World!" printed on your screen, everything has worked correctly.

# Typos? Improvements?
Thanks for reading. If you notice any typos or would like to suggest improvements, please feel free to either create an issue or PR [here](https://github.com/metamodal/blog/blob/master/quick-express-typescript-setup/quick-express-typescript-setup.md).