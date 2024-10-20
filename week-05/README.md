# Week 05 個人作業

### 1. 網址

https://www.blog.yunn.online/

### 2. 你在哪裡購買網域的

GoDaddy

### 3. DNS 的 A record 是什麼？

用於設定 domain name（或其下的子域），將其指向特定的 IPv4 address

### 4. DNS 的 NS record 是什麼？

紀錄管理這個 domain name 的 DNS Server 在哪裡

這個 dns server 會根據被查詢的 子域 + domain name，找對應的 A record 回傳指定的 IP address

### 5. Domain Name vs FQDN vs URL 這三者分別為何？

-   **URL**： 包含「協定」、「主機位置」 和「服務和資源的位置、傳入的參數」

    -   例如：https://www.blog.yunn.online/

-   **Domain Name**：

    -   單純指向一個 domain ，通常是用做品牌或公司或公司的標誌，該 domain 下可能有多個子網域
    -   例如 yunn.online 是我申請的域名，底下有 www.blog 這個子域

-   **FQDN**：Fully qualified domain name 完整網域名稱

    -   會包含或等於 domain name，可以識別唯一一台主機
    -   例如：www.blog.yunn.online. 就是指向我 ec2 instance server 的 FQDN

### 6. 為什麼應該要為網站加上憑證？而不是直接用 http 就好？

加上憑證後，傳遞的封包內容會經過**加密**，避免有惡意人士透過攔截封包而得知自己電腦的資訊（ip 位置等等），也防止封包在不知情的狀況下被惡意篡改。

# 資料來源

-   [URL](https://zh.wikipedia.org/zh-tw/统一资源定位符)
-   [FQDN](https://zh.wikipedia.org/zh-tw/完整網域名稱)
-   [搞懂 IP、FQDN、DNS、Name Server](https://its-okay.medium.com/搞懂-ip-fqdn-dns-name-server-鼠年全馬鐵人挑戰-05-aa60f45496fb)
