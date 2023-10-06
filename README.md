# 產生測試覆蓋範圍報告

package.json

```json
  "scripts": {
    "coverage": "yarn test --coverage --watchAll --collectCoverageFrom='src/components/**/*.{ts,tsx}' --collectCoverageFrom='!src/components/**/*.{types,stories,constants,test,spec}.{ts,tsx}'"
  }
```

# use msw mock api

1. install msw `yaen add -D msw`
2. setup, see src/mocks/handlers.ts , src/mocks/server.ts and src/setupTests.ts

# Static Analysis Testing

1. install vsCode extensions ESLint
2. install eslint-plugin-jest-dom
   1. `yarn add -D eslint-plugin-jest-dom`
   2. add config in package.json
      ```json
      "eslintConfig": {
        "extends": [
          "plugin:jest-dom/recommended"
        ]
      }
      ```
   3. 之後在 vscode 如果寫了不規範的代碼就會出現紅色波浪符的底線提示你規範的寫法
   4. add script in package.json ， `eslint --ignore-path .gitignore .` 表示執行 eslint ， --ignore-path 忽略 .gitignore 文件裡的目錄和文件， . 在當前目錄執行
      ```json
      "scripts": {
        "lint": "eslint --ignore-path .gitignore .",
      }
      ```
3. install prettier
   1. `yarn add --dev --exact prettier`
   2. add script in package.json ， `"prettier --ignore-path .gitignore --write \"**/*.{ts,tsx,css,scss}\""` ， 表示執行 prettier ， --ignore-path .gitignore 表示 ignore 在 .gitignore 裡定義的所有目錄及文件，--write \"**/\*.{ts,tsx,css,scss}\" 表示規定 prettier 執行的範圍， ** 為所有目錄， \* 為任意長度的任意字元，也就是 prettier 執行的範圍是當前目錄下的所有目錄下的所有 .ts 或 .tsx 或 .css 或 .scss 文件
      ```json
      "scripts": {
        "format": "prettier --ignore-path .gitignore --write \"**/*.{ts,tsx,css,scss}\"",
      },
      ```
   3. use .prettierrc.json file as a configuration, see .prettierrc.json
   4. install vsCode Prettier - Code formatter extension -> press cmd+, -> search format -> 勾選 Editor: Format On Save -> 在 settings 頁時，右上角有一個按鈕 Open Settings (JSON) 點擊後可以看到 json 版的 settings -> 在 json 加上 `"editor.defaultFormatter": "esbenp.prettier-vscode"`
4. install eslint-config-prettier ，這個套件是用來避免 eslint 和 prettier
   1. `yarn add -D eslint-config-prettier`
   2. package.json add following code
      ```json
      "eslintConfig": {
        "extends": [
          "eslint-config-prettier"
        ]
      }
      ```
5. husky 可以讓你在 git commit 前執行指令
   1. install husky, https://typicode.github.io/husky/getting-started.html
      `npx husky-init && yarn`
   2. install husky 之後根目錄會多一個 .husky 目錄，裡面會有一個 pre-commit 的文件，文件裡面會有預設會有 `npm test` 的指令，表示在 commit 之前會先執行 `npm test` ，但是我們想要的是在 commit 之前執行 lint 和 format 所以要把 `npm test` 替換成 `yarn lint && yarn format`
6. 通過 lint-staged 優化 husky ，只對這個 commit 的 file 執行 husky 設定的指令
   1. install lint-staged `yarn add -D lint-staged`
   2. 在 package.json 設定 lint-staged
      ```json
      "lint-staged":{
        "*.{ts,tsx}":["eslint"],
        "*.{ts,tsx,css,scss}":["prettier --write"]
      }
      ```
   3. 把 .husky/pre-commit 裡的 `yarn lint && yarn format` 替換成 `npx lint-staged`
