# package.json 簡介

## `dependencies` vs. `devDependencies`

-   `dependencies`
    -   **專案部署到雲端或本地 server 運行後**還需要的套件
    -   例如：Express（Node.js 的 Web 框架）
-   `devDependencies`
    -   專案在「開發」或「測試」時才需要的套件
    -   例如：Mocha（測試框架）

> 在 npm v5.0.0 之後，--save 已經成為預設指令

意思是當執行 `npm install ...` 後，npm 預設會將套件放到 `dependencies`

如果套件是**開發或測試**才需要的，可以在指令後加上 `--save-dev` 或 `-D` ，例如 `npm i mocha -D`，結果如下：

```json
"devDependencies": {
    "mocha": "^10.7.3"
}
```

`i`：`install 的縮寫`

## `scripts`

在 `scripts` 中我們可以自己定義腳本，和該腳本要執行的指令，再透過`npm run <script>` 執行已經定義好的腳本

當指令變長或複雜時，就可以透過自定義腳本，這樣就不用每次執行都要打一長串的指令

### 範例

```json
"scripts": {
    "start": "node app.js"
}
```

如此我們就可以透過 `npm run start` 來執行 `node app.js` 這個指令

因為 npm 預設支援一些常見的指令，例如：`npm start`、`npm test`
，這些指令會自動去 scripts 中找對應的腳本執行。

因此，當在 `scripts` 中新增 `start` 或 `test` 腳本，除了可以透過 `npm run <script>`，也可以直接執行 `npm start` 和 `npm test`

# 環境變數

## 為什麼需要

-   有些變數不應該直接寫在程式中，例如 資料庫密碼
-   在開發環境和正式環境時會需要使用到不同的值，例如：host、port number

這時候就需要環境變數

## 怎麼使用

### Way 1：前綴

-   讀取環境變數的方法：`process.env.NAME`
-   環境變數賦值：加在服務啟動指令的前面

#### 範例

```js
// 讀取名字為 PORT 的環境變數
const port = process.env.PORT;
```

在啟動服務時改成執行 `PORT=3002 node app.js`

#### 缺點

變數越多，啟動服務的指令越長，變數也難以維護

### Way 2：使用工具

創建 .env 檔案，將變數寫在裡面，再使用如 dotenv 這樣的工具去讀取 .env

#### dotenv 怎麼用

1. 創建 .env 檔，並將變數寫在裡面（通常以全大寫命名）

    ```
    PORT=3001
    ```

2. 安裝 dotenv：`npm install dotenv`
3. 使用

    ```
    require("dotenv").config();

    const port = process.env.PORT;
    ```

還有其他套件可以選擇，例如：

-   如果想檢查 .emv 檔案中的變數「是否齊全」，可以使用 `dotenv-safe`
    -   透過在 .env.example 中列出所有必需的環境變數，讓 `dotenv-safe` 在啟動服務時，檢查 .env.example 中寫到的變數 .env 中是否存在
    -   如果 .env 變數有少，會丟出 `MissingEnvVarsError`
-   如果想檢查「環境變數的值」，可以使用 `envalid` 搭配 `dotenv` 或 `dotenv-safe`

    -   範例

        ```
        const { cleanEnv, num } = require('envalid');

        require('dotenv-safe').config();

        // 驗證環境變數
        const env = cleanEnv(process.env, {
            PORT: num({ default: 3000 }),
        });
        ```

        如果驗證出現問題

        ```
        ================================
        Invalid environment variables:
            PORT: Invalid number input: "我"
        ================================

        Exiting with error code 1
        ```

還有很多驗證方法可以選擇，可以視需求選一個最適合自己專案的

### Way 3：Node.js 20 以上 對 .env 的支援

Node.js 20 引入了對 .env 的支援

#### 如何使用

一樣需要創建 .env 檔，並將變數寫在裡面

只是就不需要 `require("dotenv").config();`

而是改成在啟動 server 時執行

```
node --env-file=.env app.js
```

也可以傳遞多個 --env-file 參數（後續檔案會覆蓋之前檔案中定義的預設變數）

```
node --env-file=.env --env-file=.development.env app.js
```

# .gitignore 應該放什麼

我覺得如果檔案具備以下**其中一個條件**，就要避免被上傳到 remote repo

-   存放機密資料（例如資料庫密碼、tocken）的檔案，例如 .env
-   可以直接透過指令下載的檔案，例如：套件（node_modules）
-   其他人不會需要的檔案（例如在測試時暫時使用的圖片、log 檔等等）

但專案的設定檔，包含 package.json、package-lock.json 是需要的

# `import/export` for CJS 和 ESM

## CJS

-   import：使用 `require()`
-   export 使用 `module.exports` 或 `exports`
    -   `module.exports`：export **單一** object 或 class
    -   `exports`：export 多個屬性或方法等

### 以 week 02 的 stack 為例

in stack.js

```js
class Stack {...}

module.exports = Stack;
```

in main.js

```js
const Stack = require("./stack");
```

#### 如果要使用 `exports`：

in stack.js

```js
class Stack {...}

exports.Stack = Stack;
```

in main.js

```js
const { Stack } = require("./stack");
```

## ESM

-   import：使用 `import`
-   export 使用 `export` 或 `export default`
    -   `export default`：export **單一** object 或 class
    -   `export`：export 多個屬性或方法等

### 以 week 02 的 stack 為例

stack.js 改成 stack.mjs 或是在 package.json 中加上 `"type": "module"`

in stack.js

```js
export default class Stack {...}
```

in main.js

```js
import Stack from "./stack.js";
```

#### 如果要使用 `export`：

stack.js 改成 stack.mjs 或是在 package.json 中加上 `"type": "module"`

in stack.js

```js
export class Stack {...}
```

in main.js

```js
import { Stack } from "./stack.js";
```

# localhost 是什麼

localhost 就是指本機

IPv4 當初在設計的時候有預留一些特定 IP 來表達特定意思，其中就包含**表達「本機地址」的 127.0.0.1**（localhost）

所以如果要呼叫本機的服務就可以透過 `localhost:port_number` 來呼叫

# curl 是什麼

讓我們可以在 command line 發送 request 的指令，可以用來測試自己寫的 API

`curl [options] [URL...]`

## 常用的 options

-   `-L`：跟隨 301/302 重新定向
    -   e.g. `curl -L http://google.com`
-   `-H`：設定 HTTP 標頭
    -   e.g. `curl -H "Content-Type: application/json" localhost:3001`
-   `-d`、`--data`：發送數據（用於 POST 請求）
-   `-X`：指定請求方法（POST、PUT、DELETE 等），不指定就是 GET - e.g. POST request 範例
    `curl -X POST --data "email=test@example.com"  http://www.example.com/form
`
-   ` --trace`、`--trace-ascii `：記錄網絡請求的詳細信息到指定的文件

    -   如果有加 -ascii 那麼回傳的內容會以 ascii 編碼，e.g.

        ```
        == Info: Host www.google.com:80 was resolved.
        == Info: IPv6: (none)
        == Info: IPv4: 172.217.163.36
        == Info:   Trying 172.217.163.36:80...
        == Info: Connected to www.google.com (172.217.163.36) port 80
        => Send header, 77 bytes (0x4d)
        0000: GET / HTTP/1.1
        0010: Host: www.google.com
        0026: User-Agent: curl/8.8.0
        003e: Accept: */*
        004b:
        == Info: Request completely sent off
        <= Recv header, 17 bytes (0x11)
        0000: HTTP/1.1 200 OK
        <= Recv header, 37 bytes (0x25)
        0000: Date: Sat, 28 Sep 2024 10:51:35 GMT
        ```

    -   如果沒有加，e.g.

        ```
        == Info: Host www.google.com:80 was resolved.
        == Info: IPv6: (none)
        == Info: IPv4: 172.217.163.36
        == Info:   Trying 172.217.163.36:80...
        == Info: Connected to www.google.com (172.217.163.36) port 80
        => Send header, 77 bytes (0x4d)
        0000: 47 45 54 20 2f 20 48 54 54 50 2f 31 2e 31 0d 0a GET / HTTP/1.1..
        0010: 48 6f 73 74 3a 20 77 77 77 2e 67 6f 6f 67 6c 65 Host: www.google
        0020: 2e 63 6f 6d 0d 0a 55 73 65 72 2d 41 67 65 6e 74 .com..User-Agent
        0030: 3a 20 63 75 72 6c 2f 38 2e 38 2e 30 0d 0a 41 63 : curl/8.8.0..Ac
        0040: 63 65 70 74 3a 20 2a 2f 2a 0d 0a 0d 0a          cept: */*....
        == Info: Request completely sent off
        <= Recv header, 17 bytes (0x11)
        0000: 48 54 54 50 2f 31 2e 31 20 32 30 30 20 4f 4b 0d HTTP/1.1 200 OK.
        0010: 0a                                              .
        <= Recv header, 37 bytes (0x25)
        0000: 44 61 74 65 3a 20 53 61 74 2c 20 32 38 20 53 65 Date: Sat, 28 Se
        0010: 70 20 32 30 32 34 20 31 30 3a 35 31 3a 35 38 20 p 2024 10:51:58
        0020: 47 4d 54 0d 0a                                  GMT..
        ```

可以在 [curl tutorial](https://curl.se/docs/tutorial.html) 找到更多常用的指令教學

# 資料來源

-   [Express.js - env 環境變數](https://syj0905.github.io/nodejs/20200107/3250754690/)
-   [[NodeJs] npm --save 到底是什麼? --save-dev 不一樣嗎?](https://medium.com/itsems-frontend/nodejs-npm-dependencies-devdependencies-8934f641c8ef)
-   [如何從 Node.js 讀取環境變數](https://node.dev.org.tw/en/learn/command-line/how-to-read-environment-variables-from-nodejs)
-   [關於"Node.js 環境配置管理"有哪些好用的 npm 套件？](https://npm-compare.com/zh-TW/config,dotenv,dotenv-safe,envalid)
-   [【程式語言 - Javascript】 ESM 與 CJS](https://vocus.cc/article/649cc0e0fd89780001a7d34d)
-   [Linux Curl Command 指令與基本操作入門教學](https://blog.techbridge.cc/2019/02/01/linux-curl-command-tutorial/)
