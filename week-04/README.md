# Week 04 個人作業

### 1. 在 Readme 中提供 instance 的 public IP

https://13.231.105.174

因為目前只開了 https，串 domain name 那邊有申請 ssl ，這邊沒有，所以第一次點開會出現警告

**你的連線不是私人連線**

點「進階」 -> 「繼續前往該網站」還是看得到內容

### 2. 什麼是 instance type?

使用 AWS EC2 的服務就是把自己的服務架在 AWS 提供的虛擬機上。

而 instance type 就是虛擬機的規格配置。不同 instance type 有不同的硬體規格，包含不同的 CPU 數量、不同大小的 memory、storage、網路頻寬等等，讓使用者可以依據需求選擇適合自己的配置。

### 3. 什麼是 Nginx？有哪些用途與特性？

Nginx 是一個 web server，作為「使用者（client）」和「服務的主機（server）」的溝通媒介。client 將 request 發給目標的 Nginx Server，Nginx 就可以通過設定把請求轉發給對應 server，收到 server 回覆後再將 response 回傳給 client。

有以下主要功能：

-   反向代理： Nginx 可以將 request 根據不同的策略，轉發給不同的 server，實現負載均衡，同時也隱藏後端 server 的真實 IP 和架構
    -   作業中要求的將 instance ip proxy 到 express server 就是一種反向代理，將傳給 instance public ip 的 request 轉發給內部 server
-   靜態資源快取：如果 request 要求的資源 Nginx 有快取，就不用再將 request 轉發給內部 server，Nginx 可以直接回傳資源

### 4. pm2 套件是什麼？有什麼用處？

Node.js 應用的管理工具，以下是幾個常見的基本功能

-   設定服務要不要「自動重啟」、要不要在 server 開機後自動啟動
-   監控服務狀態，例如 CPU 和記憶體的使用狀況
-   管理、查看 log 檔
-   設定並管理環境變數，例如 production, test 環境變數

### 5. 步驟 9 中提到的 `proxy` 是什麼意思？為什麼要透過 Nginx 來 `proxy` 到 Express 開發的 Web Server?

proxy 有代理的意思，而步驟 9 提到的 proxy 是指反向代理

正向代理：本來應該是由自己這邊發送 request，但把工作交給其他人，由它幫你發 request。

反向代理：本來應該是服務的主機回傳 response 給你，變成由 proxy server 去和主機互動，再回傳 response

反向代理可以達到的功能：

-   負載均衡
-   提高安全性
    -   因為可以隱藏真實 server 的 ip 跟架構等資訊
    -   可以有類似防火牆的設定
-   可以透過快取提高訪問速度

### 6. 在 readme 中提供步驟 9 的 Nginx 設定檔

```
server {
    listen 80;
    server_name 54.65.171.154;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

### 7. Security Group 是什麼？用途為何？有什麼設定原則嗎？

Security Group 是一個類似防火牆的安全設定，用來管理 instance 的網路流量

入站規則：只有使用特定協定、埠號甚至 ip 的 request 才可以進入 EC2 instance，例如：ssh port 22, http port 80

出站規則：設定哪些 port 和協定 instance 可以使用，來發送 response 給哪些 ip

**設定原則**：

-   僅允許擁有特定權限的人修改 Security Group
-   如果開發者要要遠端 access instance 並實際操作，可以開啟 ssh port 22 這個入站設定
-   服務通常會開 http port 80 和 https port 443 這兩個入站設定

### 8. 什麼是 sudo? 為什麼有的時候需要加上 sudo，有時候不用？

sudo：以 root 使用者的權限執行命令

是否需要使用 sudo 取決於執行這個指令「是否需要**管理員的權限**」，通常安裝或移除軟體、修改系統設定檔等動作是需要管理員權限的，這時候就需要使用 sudo

### 9. Nginx 的 Log 檔案在哪裡？你怎麼找到的？怎麼看 Nginx 的 Log？

Nginx 的 Log 檔案在：/var/log/nginx/

**怎麼找到的**：網站教學裡有提到 Nginx 的 Log 檔案通常在：/var/log/nginx/，實際透過 ssh 連線去找也有找到

不過再去看一次 linux 檔案目錄結構的影片會知道， var 放的就是會隨著系統被使用而有變化的檔案，其中就包含 log

**怎麼看 Nginx 的 Log**：

如果是 linux 系統，可以使用 grep, cat 等指令搭配 option，透過關鍵字去搜尋並印出 log 的內容

例如：grep "GET" access.log、grep "500" access.log

### 10. 其他你在過程中遭遇的問題，有找到解答就記錄下來，沒有可以把問題放著，下次上課討論。如果沒有遇到任何問題，也可以回答「無」

無

### 11. 參考的資料

-   [Amazon EC2 執行個體類型](https://aws.amazon.com/tw/ec2/instance-types/)
-   [Download Node.js®](https://nodejs.org/en/download/package-manager)
-   [用 Nginx 伺服器建立反向代理](https://ithelp.ithome.com.tw/articles/10221704)
-   [設定 Github SSH 金鑰 feat. Github SSH、HTTPS 的差異](https://ithelp.ithome.com.tw/articles/10205988)
-   [使用 pm2 管理 Node.js 服務](https://ithelp.ithome.com.tw/articles/10220480)
-   [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
-   [用人類語言跟你說甚麼是正向代理和反向代理](https://www.pressplay.cc/project/F720CEB1D6057D7ABB5614722AB18FFF/articles/660A57208C29FF94453548ED21F284EF)
-   [使用安全組控制 AWS 資源的流量](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html)
